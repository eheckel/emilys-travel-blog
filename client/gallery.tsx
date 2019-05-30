// 1. Import React Library
import * as React from "react";
import ReactDOM from "react-dom";

// 2. Import our Data
import Data from "./script/Data";

let main = () => {
    // TODO:
    ReactDOM.render(
        <Gallery images={Data} />, 
        document.getElementById("galleryContainer")
    );
};

type Image = {
    src: string,
    thumbSrc: string,
    caption: string
}

type GalleryProps = {
    images: Image[]
}

type GalleryState = {
    selected: Image
}

// TODO add selected state

class Gallery extends React.Component<GalleryProps, GalleryState> {
    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.images[0]
        };
    }
    
    render() {
        return <div className="gallery">
            <ul className="gallery__master">{
                this.props.images.map((image, index) => {
                    return <Thumbnail 
                        selected={image === this.state.selected ? true : false}
                        image={image}
                        // or key={image.src}
                        key={index}
                        onSelect={(image) => this.selectedHandler(image)}
                     />
                })
            }</ul>
            <div className="gallery__caption">
                {this.state.selected.caption}
            </div>
            <div className="gallery__detail">
                <div className="gallery__detail-img-wrap">
                    <img className="gallery__detail-img"
                        src={this.state.selected.src}>
                    </img>
                </div>
            </div>
        </div>;
    }

    selectedHandler(image: Image): void {
        this.setState({
            selected: image
        })
    }
}

type ThumbnailProps = {
    image: Image,
    onSelect?: (image: Image) => void,
    selected: boolean,
}

class Thumbnail extends React.Component<ThumbnailProps> {
    render() {
        return <li className={`gallery__thumb ${this.props.selected ? "selected" : ""}`}>
            <div onClick={()=>this.clickHandler()} className="gallery__thumb-img-wrap">
                <img 
                    className="gallery__thumb-img" 
                    src={this.props.image.thumbSrc} 
                />
            </div>
        </li>;
    }

    clickHandler() {
        if (this.props.onSelect){
            this.props.onSelect(this.props.image)
        }
    }
}

window.addEventListener("load", main);