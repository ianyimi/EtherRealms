import { StandardEnvironment } from "spacesvr";
import InitWorld from "./helloWorld"

export default function Index() {

  return (
    <StandardEnvironment
      playerProps={{
        speed: 1.65,
        pos: [-5, 2, 0],
        rot: -Math.PI / 2,
        controls: { disableGyro: true },
      }}
      canvasProps={{
        camera: { far: 300 },
        dpr: 1.5,
        gl: { antialias: false },
      }}
      // dev={process.env.NODE_ENV === "development"}
      // simulationProps={{
      //   signalHost: "musehq.us-west-1.elasticbeanstalk.com",
      //   signalPort: 443,
      //   signalPath: "/signal",
      //   socketServer: "wss://musehq.us-west-1.elasticbeanstalk.com",
      //   frequency: 25,
      // }}
    >
      <InitWorld />
    </StandardEnvironment>
  )
}