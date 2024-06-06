import { useAddItemPictureMutation, useDeleteItemPictureMutation } from "@/api/apiSlice";
import { CameraIcon, DeleteIcon } from "@/assets/icons";
import cn from "classnames";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

type ImageUploadingProps = {
  setPicturesState: (value: string[]) => void;
  pictureIds: string[];
};

interface FileWithPreview {
  id: string;
  file?: File;
  preview: string;
}

export const ImageUploading: FC<ImageUploadingProps> = ({ setPicturesState, pictureIds = [] }) => {
  const { t } = useTranslation();
  const [addPicture] = useAddItemPictureMutation();
  const [deletePicture] = useDeleteItemPictureMutation();
  const [files, setFiles] = useState<FileWithPreview[]>(
    pictureIds?.map((id) => ({ id, preview: `${import.meta.env.VITE_SERVER_URL}/items/pictures/${id}` }))
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // console.log(files, pictureIds);

  const addFiles = async (selectedFiles: FileList) => {
    const fileArray = Array.from(selectedFiles);
    if (fileArray.some(({ type }) => type !== "image/png" && type !== "image/jpeg")) {
      toast.warn(t("file_has_to_be_png_or_jpg"), { className: "!bg-warn" });
      return;
    }
    if (fileArray.length + files.length > 5) {
      toast.warn(t("You can upload up to 5 files."), { className: "!bg-warn" });
      return;
    }
    const filePreviews = await Promise.all(
      fileArray.map(async (file) => {
        const response = await addPicture(file);
        return {
          file,
          preview: URL.createObjectURL(file),
          id: response.data,
        };
      })
    );
    setFiles((prevFiles) => [...prevFiles, ...filePreviews]);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.currentTarget.files;
    if (selectedFiles) {
      addFiles(selectedFiles);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles) {
      addFiles(droppedFiles);
    }
  };

  const handleRemoveFile = async (index: number) => {
    const response = await deletePicture(files[index].id);
    if (!response.error) {
      setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else toast.error(t("Something went wrong, try again later."), { className: "!bg-error" });
  };

  useEffect(() => {
    setPicturesState(files.map(({ id }) => id));
  }, [files]);

  useEffect(() => {
    return () => {
      if (files.length > 0)
        files.forEach(({ id }) => {
          if (!pictureIds.includes(id)) deletePicture(id);
        });
    };
  }, []);

  return (
    <>
      <div className='flex justify-between items-center mb-7'>
        <h2 className='text-green600 font-semibold text-3xl'>{t("Add photos")}</h2>
        <span className='text-2xl text-white200'>{files ? files?.length : 0}/5</span>
      </div>
      <label
        htmlFor='pictures'
        className='w-full flex-1 grid grid-cols-2 auto-rows-[150px] mobile:auto-rows-[225px] gap-6'
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => e.preventDefault()}>
        {Array(5)
          .fill(false)
          .map((_, index) => (
            <div key={index} className={cn("h-full mobile:col-span-2 relative group", index === 0 ? "col-span-2 row-span-2 mobile:row-span-1" : "")}>
              {files[index] ? (
                <>
                  <img
                    src={files[index].preview}
                    alt={`Preview ${index}`}
                    className='rounded-lg object-cover w-full h-full'
                    onClick={(e) => e.preventDefault()}
                    onError={() => {
                      toast.error(t("Failed to load image."), { className: "!bg-error" });
                      handleRemoveFile(index);
                    }}
                  />
                  <div
                    onClick={(e) => e.preventDefault()}
                    className='rounded-lg absolute inset-0 transition-all bg-[black]/40 invisible group-hover:visible opacity-0 group-hover:opacity-100 flex justify-center items-center'>
                    <DeleteIcon
                      onClick={() => handleRemoveFile(index)}
                      className={cn(
                        "stroke-white100 mobile:size-12 cursor-pointer hover:scale-110 transition-all hover:stroke-soft-red",
                        index === 0 ? "size-14" : "size-10"
                      )}
                    />
                  </div>
                </>
              ) : (
                <div
                  key={index}
                  className={cn(
                    "border-2 bg-green50 rounded-lg w-full h-full flex justify-center items-center cursor-pointer",
                    index === 0 ? "text-3xl mobile:text-2xl" : "text-2xl",
                    index === files.length ? "border-dashed border-green600" : "border-green400"
                  )}>
                  {files.length === index ? <span className='underline text-green600'>{t("Add photo")}</span> : <CameraIcon />}
                </div>
              )}
            </div>
          ))}
      </label>
      <input
        ref={fileInputRef}
        id='pictures'
        name='pictures'
        type='file'
        multiple
        onChange={handleFileChange}
        accept='image/png, image/jpeg'
        className='hidden'
      />
    </>
  );
};
