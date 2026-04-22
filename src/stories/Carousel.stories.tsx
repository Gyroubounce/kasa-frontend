import type { Meta, StoryObj } from "@storybook/nextjs";
import CarouselSB from "@/stories/CarouselSB";

const meta: Meta<typeof CarouselSB> = {
  title: "Components/Carousel",
  component: CarouselSB,
};

export default meta;

type Story = StoryObj<typeof CarouselSB>;

export const Default: Story = {
  args: {
    pictures: [
      "https://picsum.photos/id/1018/1000/600/",
      "https://picsum.photos/id/1015/1000/600/",
      "https://picsum.photos/id/1019/1000/600/",
    ],
  },
};

export const OnePicture: Story = {
  args: {
    pictures: ["https://picsum.photos/id/1018/1000/600/"],
  },
};

export const Empty: Story = {
  args: {
    pictures: [],
  },
};
