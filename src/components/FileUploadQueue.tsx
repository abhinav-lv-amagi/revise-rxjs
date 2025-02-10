import { useState } from "react";
import { concatMap, from, tap } from "rxjs";

const uploadFile = async (file: File) => {
  return new Promise<string>((resolve) =>
    setTimeout(() => {
      resolve(`Uploaded: ${file.name}`);
    }, 2000)
  );
};

export default function FileUploadQueue() {
  const [messages, setMessages] = useState<string[]>([]);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const files = Array.from(event.target.files);

    console.log(
      "Got new set of files: ",
      files.map((file) => file.name)
    );

    from(files)
      .pipe(
        concatMap((file) => uploadFile(file)),
        tap(console.log)
      )
      .subscribe((msg) => setMessages((prev) => [...prev, msg]));
  };
  return (
    <div>
      <h2>File Uploader</h2>
      <p>(concatMap)</p>
      <input
        style={{ marginTop: "20px" }}
        type="file"
        multiple
        onChange={handleUpload}
      />
      <p style={{ marginTop: "4px" }}>(Choose multiple files to see effect)</p>
      <ul style={{ marginLeft: "20px", marginTop: "20px" }}>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}
