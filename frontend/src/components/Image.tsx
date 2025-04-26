import "./Image.css";

interface ImageProps {
  src: string;
}

const Image: React.FC<ImageProps> = ({ src }) => {
  return (
    <div className="image">
      <img src={src}></img>
    </div>
  );
};

export default Image;
