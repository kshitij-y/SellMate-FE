import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";

interface Props {
  image: string[];
}


export default function ImageSlider({ image }: Props) {
  return (
    <div className="relative w-[90%] mx-auto">
      <Carousel className="w-full mx-auto">
        <CarouselContent>
          {image.map((img, index) => (
            <CarouselItem key={index}>
              <div className="">
                <Card>
                  <CardContent className="flex items-center justify-center">
                    <Image
                      src={img}
                      alt={`Product image ${index + 1}`}
                      width={400}
                      height={400}
                      className="rounded-lg object-contain w-full h-full"
                      priority={index === 0}
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
