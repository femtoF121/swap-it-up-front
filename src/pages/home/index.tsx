import { Footer, Header } from "@/components";

const HomePage = () => {
  return (
    <div className='home-container flex flex-col min-h-screen gap-8'>
      <Header />
      <div className='flex-1'>HomePage</div>
      <Footer isAuth={false} />
    </div>
  );
};

export default HomePage;
