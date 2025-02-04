import CustomButton from "@/components/sections/settings/CustomButton/CustomButton";
import Image from "next/image";

const MembershipSection = ({ backgroundImage }:any) => {

  return (
      <section className="w-full bg-colorBlack950 text-colorTextWhite py-16 relative" id="BecomeAMember">
        {/* Background Image */}
        <div
            className="absolute inset-0 w-full h-full bg-cover bg-center opacity-20"
            style={{backgroundImage: `url('${backgroundImage}')`}}
        ></div>

        <div className="relative z-10 container mx-auto px-4">
          {/* Title */}
          <h1 className="text-center text-4xl md:text-5xl lg:text-6xl font-Merriweather mb-12">
            Become A Member Of Central
          </h1>

          {/* Membership Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 px-12">
            {/* Free Membership */}
            <div>
              <h4 className="text-2xl md:text-3xl font-Merriweather mb-4">FREE MEMBERSHIP</h4>
              <p className="text-colorTextGray text-sm md:text-base">
                FOR EVERY DOLLAR YOU SPEND, YOU GET A POINT, FOR<br/>
                EVERY 200 POINTS, YOU WILL RECEIVE A $10 CREDIT.
              </p>
              <p className="text-colorTextGray text-sm md:text-base">
                CASE (12 BOTTLES) DISCOUNTS OFF
              </p>
            </div>

            {/* Paid Membership */}
            <div>
              <h4 className="text-2xl md:text-3xl font-Merriweather mb-4">PAID MEMBERSHIP</h4>
              <p className="text-colorTextGray text-sm md:text-base">
                FOR EVERY DOLLAR YOU SPEND, YOU GET A POINT, FOR<br/>
                EVERY 200 POINTS, YOU WILL RECEIVE A $10 CREDIT.
              </p>
              <p className="text-colorTextGray text-sm md:text-base">
                STORE WIDE ALL OFF (EXCLUDING ON SALE,<br/>
                CANNOT COMBINE OFFER/PROMO)
              </p>
              <p className="text-colorTextGray text-sm md:text-base">
                20% OFF 12 BOTTLES
              </p>
              <p className="text-colorTextGray text-sm md:text-base">
                PAID MEMBER SPECIAL PRICES<br/>
                6MONTHS - $50 / 12MONTHS - $80
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <CustomButton text={'Shop Now'}/>
            <CustomButton text={'Become Member'}/>
          </div>
        </div>
        <label className=' cursor-pointer z-50 absolute right-10 bottom-10' htmlFor="memberBg">
          <div className='h-10 w-10 bg-white rounded-full text-black'>
            <Image className='rounded-full'
                 src="https://png.pngtree.com/png-clipart/20191121/original/pngtree-upload-vector-icon-with-transparent-background-png-image_5156946.jpg"
                 alt=""/>
          </div>
        </label>
      </section>
  );
};

export default MembershipSection;
