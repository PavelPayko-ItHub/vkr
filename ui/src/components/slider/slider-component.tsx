import { type FC } from 'react'

import {
    Carousel,
    Flex,
    Image,
} from 'antd'

import { type IMainProps } from './slider-types'

import styles from './slider.module.css'

export const SliderComponent: FC<IMainProps> = () => {

    const contentStyle: React.CSSProperties = {
        // margin: 0,
        // color: '#fff',
        // textAlign: 'center',
        // background: '#364d79',
        //   height: '200px',
        //   lineHeight: '160px',
        //   'object-fit': 'cover'
    };
  const settings = {
    // dots: true,
    // infinite: true,
    // speed: 500,
    // slidesToShow: 1,
    // slidesToScroll: 1
  };

    //   return  <Carousel arrows autoplay {...settings}>
    //                 <Image src='../../../public/5622ba05cc6857865cfa.jpg' style={contentStyle} height={338} width={600}/>
    //                 <Image src='../../../public/7621e0c3c1df2e3322f6222ff94e67f3.jpg' style={contentStyle} height={338} width={600}/>
    //                 <Image src='../../../public/978e0d84d6b940fe1.jpg' style={contentStyle} height={338} width={600}/>
    //             {/* <div style={contentStyle}>
    //             </div>
    //             <div style={contentStyle}>
    //             </div>
    //             <div style={contentStyle}>
    //             </div> */}
    //         </Carousel>
    return   <Flex justify='center'>
            <Carousel arrows autoplay {...settings}  className={styles.container}>
                    <Image src='../../../public/5622ba05cc6857865cfa.jpg' style={contentStyle} height={338} width={600}/>
                    <Image src='../../../public/7621e0c3c1df2e3322f6222ff94e67f3.jpg' style={contentStyle} height={338} width={600}/>
                    <Image src='../../../public/978e0d84d6b940fe1.jpg' style={contentStyle} height={338} width={600}/>
                {/* <div style={contentStyle}>
                </div>
                <div style={contentStyle}>
                </div>
                <div style={contentStyle}>
                </div> */}
            </Carousel>
        </Flex>
}
