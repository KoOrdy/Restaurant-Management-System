import { useState } from "react";
import { ImageIcon, CheckCircle2Icon } from "lucide-react";
import { Button, FileUpload } from "../../../../components/ui";
import { useManageMenuItems } from "../../../../hooks/manager/menuItemsHooks";

const UploadMenuItemPhoto = ({ menuItemId }) => {
  console.log(menuItemId);
  
  const { uploadPhoto, isUploadingPhoto } = useManageMenuItems();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const validateFile = (file) => {
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      return "Only JPG, PNG, and WEBP files are allowed.";
    }
    if (file.size > 2 * 1024 * 1024) {
      return "File size must be less than 2MB.";
    }
    return null;
  };

  const handleUpload = () => {
    if (!selectedFile || !menuItemId) return;

    const formData = new FormData();
    formData.append("photo", selectedFile);

    uploadPhoto({ id: menuItemId, formData });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Upload Menu Item Photo</h2>

      <div className="flex flex-col gap-4 justify-center">
        <FileUpload
          onFileSelect={handleFileSelect}
          accept="image/*"
          validateFile={validateFile}
          icon={<ImageIcon className="w-12 h-12" />}
          successIcon={<CheckCircle2Icon className="w-12 h-12 text-green-500" />}
          name="restaurant-photo"
        />

        <Button
          type="button"
          onClick={handleUpload}
          disabled={!selectedFile || isUploadingPhoto}
          isLoading={isUploadingPhoto}
        >
          Upload Photo
        </Button>
      </div>
    </div>
  );
};

export default UploadMenuItemPhoto;
