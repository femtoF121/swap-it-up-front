import { ItemCard, Layout } from "@/components";
import image from "@/assets/images/item-picture.png";
import image1 from "@/assets/images/item-book.jpg";
import image2 from "@/assets/images/item-clothes.jpg";
import image3 from "@/assets/images/item-scarf.jpg";
import { CategoryIcon } from "@/assets/icons";

const HomePage = () => {
  return (
    <Layout withAuth className='grid gap-8 grid-cols-[repeat(auto-fit,minmax(275px,1fr))]'>
      <ItemCard
        img={image3}
        title='Item name'
        category={<CategoryIcon />}
        description='Deserunt incididunt do exercitation aute ullamco non reprehenderit ipsum incididunt consectetur voluptate proident minim id.'
        wanted='Books, cars, clothes'></ItemCard>
      <ItemCard img={image1} title='Name' category={<CategoryIcon />} description='Veniam et commodo commodo fugiat id.'></ItemCard>
      <ItemCard
        img={image}
        title='This is an item'
        category={<CategoryIcon />}
        description='Et labore minim minim ea in magna veniam non aliquip cupidatat dolore voluptate proident occaecat. Qui et duis elit fugiat ullamco ut. Ut labore Lorem nulla do nisi aliquip enim incididunt tempor. Reprehenderit deserunt minim magna ut pariatur in ut nostrud elit officia in in. Dolore duis nostrud consequat sunt eiusmod magna laboris adipisicing officia dolor. Mollit ipsum magna tempor esse minim enim cupidatat consequat dolor esse laboris ad.'
        wanted='food, dishes, test, testing, test, test123, 12334'></ItemCard>
      <ItemCard
        img={image2}
        title='Item name'
        category={<CategoryIcon />}
        description='Deserunt incididunt do exercitation aute ullamco non reprehenderit ipsum incididunt consectetur voluptate proident minim id.'
        wanted='Books, cars, clothes'></ItemCard>
      <ItemCard img={image1} title='Name' category={<CategoryIcon />} description='Veniam et commodo commodo fugiat id.'></ItemCard>
      <ItemCard
        img={image3}
        title='This is an item'
        category={<CategoryIcon />}
        description='Et labore minim minim ea in magna veniam non aliquip cupidatat dolore voluptate proident occaecat. Qui et duis elit fugiat ullamco ut. Ut labore Lorem nulla do nisi aliquip enim incididunt tempor. Reprehenderit deserunt minim magna ut pariatur in ut nostrud elit officia in in. Dolore duis nostrud consequat sunt eiusmod magna laboris adipisicing officia dolor. Mollit ipsum magna tempor esse minim enim cupidatat consequat dolor esse laboris ad.'
        wanted='food, dishes, test, testing, test, test123, 12334'></ItemCard>
      <ItemCard
        img={image1}
        title='Item name'
        category={<CategoryIcon />}
        description='Deserunt incididunt do exercitation aute ullamco non reprehenderit ipsum incididunt consectetur voluptate proident minim id.'
        wanted='Books, cars, clothes'></ItemCard>
      <ItemCard img={image2} title='Name' category={<CategoryIcon />} description='Veniam et commodo commodo fugiat id.'></ItemCard>
      <ItemCard
        img={image}
        title='This is an item'
        category={<CategoryIcon />}
        description='Et labore minim minim ea in magna veniam non aliquip cupidatat dolore voluptate proident occaecat. Qui et duis elit fugiat ullamco ut. Ut labore Lorem nulla do nisi aliquip enim incididunt tempor. Reprehenderit deserunt minim magna ut pariatur in ut nostrud elit officia in in. Dolore duis nostrud consequat sunt eiusmod magna laboris adipisicing officia dolor. Mollit ipsum magna tempor esse minim enim cupidatat consequat dolor esse laboris ad.'
        wanted='food, dishes, test, testing, test, test123, 12334'></ItemCard>
    </Layout>
  );
};

export default HomePage;
