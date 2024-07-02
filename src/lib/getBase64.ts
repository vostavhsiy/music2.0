export function getBase64(
  file: File,
  cb: (result: string | ArrayBuffer | null) => void,
) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result);
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
}
