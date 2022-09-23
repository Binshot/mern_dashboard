import React from "react";
import uploadEventBanner from "./DashboardPages/Components/NewImageFiles/Event/uploadEventBanner.svg"
import imageIcon from "./DashboardPages/Components/NewImageFiles/Event/imageIcon.svg"
import axios from "axios";

const TryUpload = () => {

    const fileName= document.getElementById('fileName')
    const fileSize = document.getElementById('fileSize')
    const progress = document.getElementsByClassName('progress')
    const progressArea = document.getElementsByClassName('progress-area')
    const onImageUpload = (image) => {
        // console.log(image)
        // if(image){
        //     let fileName = image.name
        //     console.log(fileName)
        // }
        const config = {
            onUploadProgress: function(progressEvent){
                const percentCompleted = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
                console.log(percentCompleted)
                let totalSize = progressEvent.total / 1000
                // fileSize.textContent=`${percentCompleted}KB`
                fileName.textContent=`${image.name}`
            }
        }
        axios.post("https://httpbin.org/post", image, config)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
    return (
        <div>
            <div className="uploadArticleBanner" style={{ marginBottom: "16px", cursor: "pointer" }} >
                <label className="fileUpload" style={{ cursor: "pointer" }}>
                    <div className="flex-row fileUploadContent">
                        <div className="flex-row">
                            <img src={uploadEventBanner} alt="" />
                            <div className="flex-column">
                                <h4>Upload an image or drag and drop here</h4>
                                <p>JPG or PNG, smaller than 10MB</p>
                            </div>
                        </div>
                        <div className="upload" style={{ cursor: "pointer" }}>Upload</div>
                    </div>
                    <input type="file" accept="image/*" onChange={(e) => onImageUpload(e.target.files[0])} />
                </label>
            </div>
            <section className="progress-area">
                <img src={imageIcon} alt="" />
                <div className="center-div">
                    <div className="progress-details">
                        <span id="fileName">.png</span>
                        <span id="fileSize">0KB</span>
                    </div>
                    <div className="progress-bar">
                        <div className="progress"></div>
                    </div>
                </div>
                <div>X</div>
            </section>
            <section className="uploaded-area">
                <img src={imageIcon} alt="" />
                <div className="center-div">
                    <div className="progress-details">
                        <div className="left">
                            <span>Image.png</span>
                            <div></div>
                            <button>Preview</button>
                        </div>
                        <span>5.9MB</span>
                    </div>
                </div>
                <div>X</div>
            </section>
        </div>
    )
}

export default TryUpload
