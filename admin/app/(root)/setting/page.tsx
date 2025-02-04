'use client'

import { useGetImageQuery } from "@/features/api/imageSlice";
import { useUpdateImageMutation } from "@/features/api/imageUploadSlice";
import AccessoriesSection from "./HomeComponents/AccessoriesSection/AccessoriesSection";
import MembershipSection from "./HomeComponents/MembershipSection/MembershipSection";
import ShopNowSection from "./HomeComponents/ShopNowSection/ShopNowSection";
import GiftSection from "./HomeComponents/GiftSection/GiftSection";
import HeroSection from "./HomeComponents/HeroSection/HeroSection";
import CategorySection from "./HomeComponents/CategorySection/CategorySection";
import BestSaleSection from "./HomeComponents/BestSaleSection/BestSaleSection";
import CardSection from "./HomeComponents/CardSection/CardSection";
import Image from "next/image";

const Setting = () => {
    const {
        data: Images,
        isLoading: getImageIsLoading,
        isFetching: getImageIsFetching,
        error: getImageError,
        refetch,
    } = useGetImageQuery({});

    const [imageUpdate, { isLoading, error }] = useUpdateImageMutation();

    const getImageBySection = (section: string) => {
        interface Image {
            section: string;
            imageUrl: string;
        }

        const image: Image | undefined = Images?.find((img: Image) => img.section === section);
        return image ? image.imageUrl : ''; // Return the URL if found, otherwise an empty string
    };

    console.log(Images)


    const handelUpdateImage = async (e: any) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (!file) return;

        const updateImageData = new FormData();
        updateImageData.append("section", e.target.name);
        updateImageData.append("image", file);


        try {
            await imageUpdate(updateImageData).unwrap();


            refetch();
        } catch (error) {

            console.error(error);
        }
    }

    if (getImageIsLoading || getImageIsFetching || isLoading) {
        return (
            <div className="h-[80vh] w-full flex justify-center items-center">
                <p>Loading...</p>
                {/* <CLoader /> */}
            </div>
        );
    }

    if (getImageError || error) {
        return (
            <div className="h-[80vh] w-full flex justify-center items-center">
                <p>Error Fetching</p>
                {/* <ErrorFetching /> */}
            </div>
        );
    }

    return (
        <div>
            <>
                <HeroSection heroImage={getImageBySection('hero')} backgroundImage={getImageBySection('heroBg')} />
                <CategorySection categoryImage={getImageBySection('categoryBg')} />
                <BestSaleSection />
                <CardSection card1Image={getImageBySection('card1')} card2Image={getImageBySection('card2')}
                    card3Image={getImageBySection('card3')} card4Image={getImageBySection('card4')}
                />

                {/* First Promotional Section */}
                <section className="w-full bg-colorBlack950">
                    <div className=" mx-auto relative flex justify-center items-center">
                        <Image
                            src={getImageBySection('promo1')} // Dynamically load banner image
                            alt="Promotional Image"
                            className="w-full h-auto object-cover shadow-lg"
                        />
                        <label className=' cursor-pointer z-50 absolute ' htmlFor="promo1">
                            <div className='h-10 w-10 bg-white rounded-full text-black'>
                                <Image className='rounded-full'
                                    src="https://png.pngtree.com/png-clipart/20191121/original/pngtree-upload-vector-icon-with-transparent-background-png-image_5156946.jpg"
                                    alt="" />
                            </div>
                        </label>
                    </div>
                </section>

                <AccessoriesSection />
                <MembershipSection backgroundImage={getImageBySection('memberBg')} />
                <ShopNowSection shopImage={getImageBySection('shopWine')}
                    spiritImage={getImageBySection('shopSpirits')} />
                <GiftSection />

                {/* Second Promotional Section with Two Images */}
                <section className="w-full h-[460px] bg-colorBlack950">
                    <div className="relative container mx-auto flex flex-col md:flex-row">
                        <Image
                            src={getImageBySection('promo2')} // Dynamically load promotion image
                            alt="Promotional Image"
                            className="w-full md:w-1/2 h-[460px] object-cover shadow-lg"
                        />
                        <Image
                            src={getImageBySection('promo3')} // Dynamically load another promotion image
                            alt="Promotional Image"
                            className="w-full md:w-1/2 h-[460px] object-cover shadow-lg"
                        />
                        <div className='absolute flex justify-around h-full items-center w-full'>
                            <label className=' cursor-pointer z-50 ' htmlFor="promo2">
                                <div className='h-10 w-10 bg-white rounded-full text-black'>
                                    <Image className='rounded-full'
                                        src="https://png.pngtree.com/png-clipart/20191121/original/pngtree-upload-vector-icon-with-transparent-background-png-image_5156946.jpg"
                                        alt="" />
                                </div>
                            </label>
                            <label className=' cursor-pointer z-50 ' htmlFor="promo3">
                                <div className='h-10 w-10 bg-white rounded-full text-black'>
                                    <Image className='rounded-full'
                                        src="https://png.pngtree.com/png-clipart/20191121/original/pngtree-upload-vector-icon-with-transparent-background-png-image_5156946.jpg"
                                        alt="" />
                                </div>
                            </label>
                        </div>
                    </div>
                </section>
            </>

            {
                Images?.map((image: any) => (
                    <input key={image.section} onChange={handelUpdateImage} className='hidden' type="file"
                        name={image.section} id={image.section} />
                ))
            }
        </div>
    );
};

export default Setting;
