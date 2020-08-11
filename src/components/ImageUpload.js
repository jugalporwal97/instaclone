import React, {useState} from "react";
import {Input, Button} from "@material-ui/core";
import {storage, db} from "../firebase";
import firebase from "firebase";
import './ImageUpload.css'

function ImageUpload({username}) {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setcaption] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress function
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //post image inside db
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
            setProgress(0);
            setcaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="imageupload" >
      <progress className="image__progress" value={progress} max="100"></progress>
      <Input
        type="text"
        placeholder="Enter a caption ..."
        value={caption}
        onChange={(e) => setcaption(e.target.value)}
      />
      <Input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default ImageUpload;
