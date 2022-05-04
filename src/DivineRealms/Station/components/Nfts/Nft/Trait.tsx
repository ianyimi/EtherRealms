import {GroupProps} from "@react-three/fiber";
import {Box, Text} from "@react-three/drei";

const TEXT_COLOR = "black";
const FONT = "https://d1p3v0j4bqcb21.cloudfront.net/fonts/Graffiti+City.otf";

function camelCase(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default function Trait(props: { title: string, color?: string, value: string, count: number, supply: number } & GroupProps) {

  const { title, color, value, count, supply, ...restProps } = props;

  let percentage = Math.round((count/supply)*10000)/100;
  if (percentage === 0) percentage = Math.round((count/supply)*100000)/1000;
  if (percentage === 0) percentage = Math.round((count/supply)*1000000)/10000;

  return (
    <group name="trait" {...restProps}>
      <Box args={[0.9, 0.5, 0.1]}>
        <meshStandardMaterial color="white" />
      </Box>
      <group position-z={0.05}>
        <Text
          fontSize={0.1}
          color={TEXT_COLOR}
          position-y={0.175}
          depthOffset={-1}
        >
          {camelCase(title)}
        </Text>
        <Text
          fontSize={0.2}
          font={FONT}
          maxWidth={1}
          textAlign="center"
          color={color ? color.toLowerCase() : TEXT_COLOR}
          depthOffset={-1.5}
        >
          {value}
        </Text>
        <Text
          fontSize={0.1}
          color={TEXT_COLOR}
          position-y={-0.175}
          depthOffset={-1}
        >
          {count === 1 ? `1/1` : `${percentage}%`}
        </Text>
      </group>
    </group>
  )
}
