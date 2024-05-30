import { CameraIcon, DeleteIcon } from "@/assets/icons";
import cn from "classnames";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ImageUploadingProps = {
  setPicturesState: (value: FileList) => void;
};

interface FileWithPreview {
  file: File;
  preview: string;
}

export const ImageUploading: FC<ImageUploadingProps> = ({ setPicturesState }) => {
  const { t } = useTranslation();
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addFiles = (selectedFiles: FileList) => {
    const fileArray = Array.from(selectedFiles);
    if (fileArray.some(({ type }) => type !== "image/png" && type !== "image/jpeg")) {
      toast.warn(t("File have to be .png or .jpg extension."), { className: "!bg-orange50" });
      return;
    }
    if (fileArray.length + files.length > 5) {
      toast.warn(t("You can upload up to 5 files."), { className: "!bg-orange50" });
      return;
    }
    const filePreviews = fileArray.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
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

  const handleRemoveFile = (index: number) => {
    setFiles((previews) => previews.filter((_, i) => i !== index));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    const dataTransfer = new DataTransfer();
    files.forEach(({ file }) => dataTransfer.items.add(file));
    setPicturesState(dataTransfer.files);
  }, [files]);

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
            <div className={cn("h-full mobile:col-span-2 relative group", index === 0 ? "col-span-2 row-span-2 mobile:row-span-1" : "")}>
              {files[index] ? (
                <>
                  <img
                    src={files[index].preview}
                    alt={`Preview ${index}`}
                    className='rounded-lg object-cover w-full h-full'
                    onClick={(e) => e.preventDefault()}
                    onError={() => {
                      toast.error(t("Failed to load image."), { className: "!bg-[red]/20" });
                      handleRemoveFile(index);
                    }}
                  />
                  <div
                    onClick={(e) => e.preventDefault()}
                    className='rounded-lg absolute inset-0 transition-all bg-[black]/40 invisible group-hover:visible opacity-0 group-hover:opacity-100 flex justify-center items-center'>
                    <DeleteIcon
                      onClick={() => handleRemoveFile(index)}
                      className={cn(
                        "stroke-white100 mobile:size-12 cursor-pointer hover:scale-110 transition-all hover:stroke-[#ff3546]",
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
                  {/* <button onClick={() => handleRemoveFile(index)}>Remove</button> */}
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
      <ToastContainer position='bottom-right' hideProgressBar closeOnClick transition={Slide} />
    </>
  );
};
