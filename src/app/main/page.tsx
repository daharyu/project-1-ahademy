import HeaderSection from '@/components/header/page';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination';
import GenreSection from './genre/page';
import RecommendSection from './recommend/page';
import AuthorSection from './author/page';
import FooterPage from '@/components/footer/page';

const HomePage = () => {
  return (
    <>
      <HeaderSection />
      {/* WELCOME BOOKY */}
      <section className='section mt-20 md:mt-[128px]'>
        <div className='flex flex-col gap-4'>
          <div className="relative mx-auto h-[133px] w-full rounded-4xl bg-[url('/images/cover.svg')] bg-contain bg-center bg-no-repeat md:h-[441px]">
            <div className='absolute top-1/2 left-1/2 flex w-[670px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-0 text-center text-[#6597E8]'>
              <h1 className='text-outline-white text-10 font-bold text-shadow-white md:text-[82.52px]'>
                Welcome to
              </h1>
              <h1 className='text-10 text-outline-white font-bold text-shadow-white md:text-[82.52px]'>
                Booky
              </h1>
            </div>
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <div className='size-2.5 rounded-full bg-[#1C65DA]'></div>
              </PaginationItem>
              <PaginationItem>
                <div className='size-2.5 rounded-full bg-neutral-300'></div>
              </PaginationItem>
              <PaginationItem>
                <div className='size-2.5 rounded-full bg-neutral-300'></div>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </section>

      <GenreSection />
      <RecommendSection />
      <AuthorSection />
      <FooterPage />
    </>
  );
};

export default HomePage;
