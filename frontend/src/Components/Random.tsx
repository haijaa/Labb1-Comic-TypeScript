import { mdiRotate3dVariant } from "@mdi/js";
import { Icon } from "@mdi/react";

interface RandomProps {
  allComics: Array;
  setCurrentIndex: (index: number) => void;
  currentIndex: Number;
}

export default function RandomMagazine(props: RandomProps) {
  const RandomMagazine = () => {
    const currentIndex = Math.floor(Math.random() * props.allComics.length);
    props.setCurrentIndex(currentIndex);
  };
  return (
    <div
      className="flex items-center mt-10 ml-10 hover"
      onClick={RandomMagazine}
    >
      <Icon path={mdiRotate3dVariant} size={2} />
      <p>Random magazine</p>
    </div>
  );
}

/* RandomMagazine.propTypes = {
  allComics: PropTypes.array.isRequired,
  currentIndex: PropTypes.number.isRequired,
  setCurrentIndex: PropTypes.func.isRequired,
}; */
