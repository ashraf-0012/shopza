import Categories from "../components/Categories"
import FeaturedProducts from "../components/FeaturedProducts"
import Hero from "../components/Hero"
import NewsletterSection from "../components/NewsletterSection"
import PromoSection from "../components/PromoSection"

function Home() {
  return (
   <>
    <Hero />
    <Categories />
    <FeaturedProducts />
    <PromoSection />
    <NewsletterSection />

   </>
  )
}

export default Home