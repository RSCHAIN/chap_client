import FooterR from "@/components/footerResponsif";
import BarBleu from "@/components/generale/BarBleu";
import LadingCorps from "@/components/generale/LadingCorps";
import SliderComponents from "@/components/generale/SliderComponents";
import InputBar from "@/components/InputBar";
import Navbar from "@/components/Navbar";
import { useMediaQuery } from "@chakra-ui/react";


export default function Home() {
  const [isLagerThan768] = useMediaQuery('(min-width: 768px)')
  return (
    <>
      {/* <BarBleu /> */}
      <InputBar />
      {isLagerThan768 ? <Navbar></Navbar> : <></>}
      <SliderComponents />
      <LadingCorps />

      <FooterR/>
    </>
  );
}
