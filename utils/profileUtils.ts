export const toggleEdit = (isEditable: boolean, setIsEditable: (value: boolean) => void) => {
  setIsEditable(!isEditable);
};

export const saveChanges = async (
  fullName: string,
  email: string,
  imageUri: string,
  isImageEdited: boolean,
  setIsLoading: (value: boolean) => void,
  saveUserDetails: (details: { fullName: string; email: string; imageUri: string }, isImageEdited: boolean) => Promise<void>,
  setIsEditable: (value: boolean) => void,
  setIsImageEdited: (value: boolean) => void,
  Alert: { alert: (message: string) => void }
) => {
  setIsLoading(true);
  await saveUserDetails({ fullName, email, imageUri }, isImageEdited);
  setIsLoading(false);
  setIsEditable(false);
  setIsImageEdited(false);
  Alert.alert('Profile details updated');
};
