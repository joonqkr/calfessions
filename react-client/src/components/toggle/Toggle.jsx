import { useEffect, useState } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function Toggle() {
  const [alignment, setAlignment] = useState('yourPosts');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton value="yourPosts">Your posts</ToggleButton>
      <ToggleButton value="likedPosts">Liked posts</ToggleButton>
    </ToggleButtonGroup>
  );
}

// import SwitchSelector from "react-switch-selector";

// const options = [
//   {
//     label: "your posts",
//     value: "yourposts",
//     fontColor: "#8860D0",
//     selectedBackgroundColor: "#8860D0",
//     border: "30px solid black"
//   },
//   {
//     label: "liked posts",
//     value: "likedposts",
//     selectedBackgroundColor: "#8860D0",
//     fontColor: "#8860D0"
//   }
// ];

// const onChange = (newValue) => {
//   console.log(newValue);
// };

// const initialSelectedIndex = options.findIndex(({ value }) => value === "bar");

// export default function Toggle() {
//   return (
//     <div className="tog">
//       <p style={{ height: "30px" }}>
//         <SwitchSelector
//           onChange={onChange}
//           options={options}
//           initialSelectedIndex={initialSelectedIndex}
//           backgroundColor={"#ffffff"}
//           fontSize={12}
//           selectedFontColor={"#f5f6fa"}
//           wrapperBorderRadius={8}
//           optionBorderRadius={8}
//           border="1px solid #8860D0"
//         />
//       </p>
//     </div>
//   );
// }