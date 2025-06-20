import Button from '@components/ui/Button';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
  MediaType,
} from 'react-native-image-picker';

// Type definitions for file and form control
interface FileType {
  name?: string;
  size?: number;
  type?: string;
  uri?: string;
}

interface FormControlType {
  register?: (name: string) => {
    value: FileType | FileType[] | string | string[] | null;
    onChangeText: (value: FileType | FileType[] | null) => void;
  };
}

// Single Image Upload Component
interface SingleImageUploadProps {
  label: string;
  onImageSelect?: (image: FileType | string | null) => void;
  error?: string;
  isRequired?: boolean;
  allowCamera?: boolean;
  name?: string;
  formControl?: FormControlType;
  maxSize?: number; // In MB
}

export const FormSingleImageUpload: React.FC<SingleImageUploadProps> = ({
  label,
  onImageSelect,
  error,
  isRequired = false,
  allowCamera = true,
  name,
  formControl = {},
  maxSize = 5, // Default 5MB
}) => {
  const [selectedImage, setSelectedImage] = useState<FileType | string | null>(
    null,
  );

  // Handle form control integration
  const imageProps =
    name && formControl.register
      ? formControl.register(name)
      : {
          value: selectedImage,
          onChangeText: setSelectedImage,
        };

  useEffect(() => {
    if (imageProps.value) {
      setSelectedImage(imageProps.value as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Request camera permissions
  const requestCameraPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  // Handle image selection validation
  const validateImage = (response: ImagePickerResponse): FileType | null => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
      return null;
    }

    if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorMessage);
      return null;
    }

    if (!response.assets || response.assets.length === 0) {
      return null;
    }

    const asset = response.assets[0];

    // Validate file size
    const fileSizeMB = (asset.fileSize || 0) / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      onImageSelect && onImageSelect(null);
      Alert.prompt(`Image size should be less than ${maxSize}MB`);
      return null;
    }

    return {
      name: asset.fileName || 'image.jpg',
      size: asset.fileSize,
      type: asset.type,
      uri: asset.uri,
    };
  };

  // Open camera
  const openCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      return;
    }

    launchCamera(
      {
        mediaType: 'photo' as MediaType,
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      },
      (response: any) => {
        const fileObject = validateImage(response);

        if (fileObject) {
          setSelectedImage(fileObject);
          onImageSelect && onImageSelect(fileObject);
          imageProps.onChangeText(fileObject);
        }
      },
    );
  };

  // Open image library
  const openImageLibrary = () => {
    launchImageLibrary(
      {
        mediaType: 'photo' as MediaType,
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      },
      (response: any) => {
        const fileObject = validateImage(response);

        if (fileObject) {
          setSelectedImage(fileObject);
          onImageSelect && onImageSelect(fileObject);
          imageProps.onChangeText(fileObject);
        }
      },
    );
  };

  // Clear selected image
  const clearImage = () => {
    setSelectedImage(null);
    onImageSelect && onImageSelect(null);
    imageProps.onChangeText(null);
  };

  return (
    <View style={styles.imageUploadContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.inputLabel}>{label}</Text>
        {isRequired && <Text style={styles.requiredStar}>*</Text>}
      </View>

      <View style={styles.imageUploadActions}>
        {allowCamera && (
          <TouchableOpacity style={styles.cameraButton} onPress={openCamera}>
            <Text style={styles.buttonText}>Camera</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.libraryButton}
          onPress={openImageLibrary}>
          <Text style={styles.buttonText}>Gallery</Text>
        </TouchableOpacity>
      </View>

      {selectedImage && (
        <View style={styles.selectedImageContainer}>
          <Image
            source={{
              uri:
                typeof selectedImage === 'string'
                  ? selectedImage
                  : selectedImage.uri,
            }}
            style={styles.previewImage}
            resizeMode="cover"
          />
          <View style={styles.imageDetailContainer}>
            <Text numberOfLines={1} style={styles.selectedImageName}>
              {typeof selectedImage === 'string'
                ? selectedImage
                : selectedImage.name}
            </Text>
            <TouchableOpacity onPress={clearImage} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

// Multiple Image Upload Component
interface MultiImageUploadProps {
  label: string;
  onImagesSelect?: (images: (string | FileType)[]) => void;
  error?: string;
  isRequired?: boolean;
  maxFiles?: number;
  maxSize?: number; // In MB
  name?: string;
  formControl?: FormControlType;
}

export const FormMultiImageUpload: React.FC<MultiImageUploadProps> = ({
  label,
  onImagesSelect,
  error,
  isRequired = false,
  maxFiles = 5,
  maxSize = 5, // Default 5MB
  name,
  formControl = {},
}) => {
  const [selectedImages, setSelectedImages] = useState<(string | FileType)[]>(
    [],
  );
  // Handle form control integration
  const imageProps =
    name && formControl.register
      ? formControl.register(name)
      : {
          value: selectedImages,
          onChangeText: setSelectedImages,
        };

  useEffect(() => {
    if (imageProps.value) {
      setSelectedImages(imageProps.value as string[]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Validate and process selected images
  const processSelectedImages = (response: ImagePickerResponse) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
      return;
    }

    if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorMessage);
      return;
    }

    if (!response.assets) {
      return;
    }

    // Filter and validate images
    const validImages: FileType[] = response.assets
      .map(asset => ({
        name: asset.fileName || 'image.jpg',
        size: asset.fileSize,
        type: asset.type,
        uri: asset.uri,
      }))
      .filter(image => {
        const fileSizeMB = (image.size || 0) / (1024 * 1024);
        return fileSizeMB <= maxSize;
      })
      .slice(0, maxFiles - selectedImages.length);

    // Update images
    const updatedImages = [...selectedImages, ...validImages];
    setSelectedImages(updatedImages);
    onImagesSelect && onImagesSelect(updatedImages);
    imageProps.onChangeText(updatedImages);
  };

  // Open image library for multiple images
  const openImageLibrary = () => {
    launchImageLibrary(
      {
        mediaType: 'photo' as MediaType,
        selectionLimit: maxFiles - selectedImages.length,
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      },
      processSelectedImages,
    );
  };

  // Remove a specific image
  const removeImage = (indexToRemove: number) => {
    const updatedImages = selectedImages.filter(
      (_, index) => index !== indexToRemove,
    );
    setSelectedImages(updatedImages);
    onImagesSelect && onImagesSelect(updatedImages);
    imageProps.onChangeText(updatedImages);
  };

  return (
    <View style={styles.imageUploadContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.inputLabel}>{label}</Text>
        {isRequired && <Text style={styles.requiredStar}>*</Text>}
      </View>

      <Button
        label={`Choose Images (${selectedImages.length}/${maxFiles})`}
        onPress={openImageLibrary}
        disabled={selectedImages.length >= maxFiles}
      />

      <View style={styles.selectedImagesContainer}>
        {selectedImages.map((image, index) => (
          <View key={index} style={styles.thumbnailContainer}>
            <Image
              source={{uri: typeof image === 'string' ? image : image.uri}}
              style={styles.thumbnailImage}
              resizeMode="cover"
            />
            <TouchableOpacity
              onPress={() => removeImage(index)}
              style={styles.thumbnailRemoveButton}>
              <Text style={styles.thumbnailRemoveText}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  imageUploadContainer: {
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  requiredStar: {
    color: '#e74c3c',
    fontSize: 14,
    marginLeft: 4,
  },
  imageUploadActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cameraButton: {
    flex: 0.48,
    height: 48,
    backgroundColor: '#2ecc71',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  libraryButton: {
    flex: 1,
    height: 48,
    backgroundColor: '#3498db',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  selectedImageContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginTop: 8,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: 200,
  },
  imageDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  selectedImageName: {
    flex: 1,
    marginRight: 10,
    fontSize: 14,
  },
  clearButton: {
    padding: 5,
  },
  clearButtonText: {
    color: '#e74c3c',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 4,
  },
  selectedImagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  thumbnailContainer: {
    position: 'relative',
    width: 80,
    height: 80,
    margin: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  thumbnailRemoveButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailRemoveText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
