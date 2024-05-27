import { Button, Input, ItemCard, Layout, ScrollButton } from "@/components";
import image from "@/assets/images/item-picture.webp";
import image1 from "@/assets/images/item-book.webp";
import image2 from "@/assets/images/item-clothes.webp";
import image3 from "@/assets/images/item-scarf.webp";
import { CategoryIcon } from "@/assets/icons";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Layout withAuth>
        <search className='flex gap-6 max-w-[800px] mx-auto mb-6'>
          <Input
            type='text'
            name='search'
            className='shrink'
            inputClassName='!border-orange100 border-[2px] !h-full text-[1.5rem]'
            placeholder={t("What are you looking for?")}
          />
          <Button styleType='secondary' className='shrink-0 font-semibold'>
            {t("Search")}
          </Button>
        </search>
        <div className='grid gap-x-[2%] gap-y-[2rem] tablet:gap-y-[1rem] grid-cols-[repeat(auto-fit,minmax(275px,1fr))] below-768:grid-cols-[repeat(auto-fit,minmax(155px,1fr))]'>
          <ItemCard img={image1} title='Name' category={<CategoryIcon />} description='Veniam et commodo commodo fugiat id.' />
          <ItemCard
            img={image3}
            title='This is an item'
            category={<CategoryIcon />}
            description='Et labore minim minim ea in magna veniam non aliquip cupidatat dolore voluptate proident occaecat. Qui et duis elit fugiat ullamco ut. Ut labore Lorem nulla do nisi aliquip enim incididunt tempor. Reprehenderit deserunt minim magna ut pariatur in ut nostrud elit officia in in. Dolore duis nostrud consequat sunt eiusmod magna laboris adipisicing officia dolor. Mollit ipsum magna tempor esse minim enim cupidatat consequat dolor esse laboris ad.'
            wanted='food, dishes, test, testing, test, test123, 12334'
          />
          <ItemCard
            img={image1}
            title='Item name'
            category={<CategoryIcon />}
            description='Deserunt incididunt do exercitation aute ullamco non reprehenderit ipsum incididunt consectetur voluptate proident minim id.'
            wanted='Books, cars, clothes'
          />
          <ItemCard img={image2} title='Name' category={<CategoryIcon />} description='Veniam et commodo commodo fugiat id.' />
          <ItemCard
            img={image}
            title='This is an item'
            category={<CategoryIcon />}
            description='Et labore minim minim ea in magna veniam non aliquip cupidatat dolore voluptate proident occaecat. Qui et duis elit fugiat ullamco ut. Ut labore Lorem nulla do nisi aliquip enim incididunt tempor. Reprehenderit deserunt minim magna ut pariatur in ut nostrud elit officia in in. Dolore duis nostrud consequat sunt eiusmod magna laboris adipisicing officia dolor. Mollit ipsum magna tempor esse minim enim cupidatat consequat dolor esse laboris ad.'
            wanted='food, dishes, test, testing, test, test123, 12334'
          />
        </div>
      </Layout>
      <ScrollButton />
    </>
  );
};

export default HomePage;
