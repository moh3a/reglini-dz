/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";

export interface IProduct {
  productId: string;
  imageUrl: string;
  title: string;
  price: number;
}
const products: IProduct[] = [
  {
    productId: "1005002368599346",
    title:
      "Xiaomi Mi bande 6 Bracelet intelligent 5 couleurs AMOLED écran Miband 6 sang oxygène Fitness Traker Bluetooth étanche bande intelligente",
    price: 7240,
    imageUrl:
      "https://scontent.falg7-1.fna.fbcdn.net/v/t45.5328-4/268009815_4722123681169211_5393667561140439390_n.png?_nc_cat=104&ccb=1-5&_nc_sid=c48759&_nc_eui2=AeHd1ky0CrbbHCeJ-aMi8czW5FReCOnM7FjkVF4I6czsWJjtCsVW3vOLCjvJ7LnmJE1r6oIUZC5X1UpUk9V5TBL1&_nc_ohc=pomNfm-9_NEAX_IXnXR&_nc_ht=scontent.falg7-1.fna&oh=00_AT_RC-ouWf7boVyAwI3f-qt0GIq3EF60afU8ygsyz64R1w&oe=61E48429",
  },
  {
    productId: "32931005654",
    title:
      "Fifine - Microphone USB cardioïde à condensateur en métal, studio d'enregistrement de voix off, pour ordinateur portable, Windows, YouTube-K669",
    price: 7120,
    imageUrl:
      "https://scontent.falg7-2.fna.fbcdn.net/v/t45.5328-4/271734104_4791134284285342_1873646464451361115_n.png?_nc_cat=101&ccb=1-5&_nc_sid=c48759&_nc_eui2=AeGfhI4RjjNu1KYyUDGE3QviD3yY2eDnuGMPfJjZ4Oe4Y9NyP9OnJvX7f7oQHncm2vLcHVUA0zGlfO1OSg6nvJMQ&_nc_ohc=OtNC2Mhg7-EAX8Tc8oD&_nc_ht=scontent.falg7-2.fna&oh=00_AT8QlihS_kwddESKLXC3fkn3HYczCb-fDVQZC-KyNYIS_g&oe=61E365B9",
  },
  {
    productId: "4000908408400",
    title:
      "Collier chic en résine transparente, pendentif de lune, chaine avec bijoux nuage en suspension dans une boule, cadeaux pour filles à la mode",
    price: 240,
    imageUrl:
      "https://scontent.falg7-2.fna.fbcdn.net/v/t45.5328-4/270788300_4762648553811192_5322619425499277180_n.png?_nc_cat=101&ccb=1-5&_nc_sid=c48759&_nc_eui2=AeEiaRc7dXk1eevixH6pttKT8y1duTqoyr3zLV25OqjKvRc_O2li9SBIlJgVRzJ7cImW9vQFGPXiWZAUy-LOEe3T&_nc_ohc=xFEDIg_2XbcAX83VWwh&_nc_ht=scontent.falg7-2.fna&oh=00_AT9zJk1AG2amoEPuZO383AMteoO0bGfnm5Sg9e3g-p_qYQ&oe=61E4F98A",
  },
  {
    productId: "4000094534783",
    title:
      "Montre Minimaliste Ultra Mince à Quartz pour Homme en Maille d'Acier Inoxydable, avec Ceinture, pour les Affaires, Simple, 2021",
    price: 690,
    imageUrl:
      "https://scontent.falg7-2.fna.fbcdn.net/v/t45.5328-4/269966769_5207409259289172_6570042751923814741_n.png?_nc_cat=103&ccb=1-5&_nc_sid=c48759&_nc_eui2=AeGs1bwb27x08umcifpsZqcV2YD8ilWggjrZgPyKVaCCOlfUxRraDo7-IpkX0VsEr0iZadNCMHEAfl5cnIrR0PwF&_nc_ohc=TmiSF1-ThIAAX_97EkB&_nc_ht=scontent.falg7-2.fna&oh=00_AT9uxJBqZQUBlqHIIMaX0yYDdM7pJOjlrK9GOzhLROxQpA&oe=61E4D093",
  },
  {
    productId: "1005003360993959",
    title:
      "Mac Book 12 pouces d'occasion, ordinateur portable sans dommage technique, Intel Core M, 256 go, Space Gray",
    price: 182250,
    imageUrl:
      "https://scontent.falg7-2.fna.fbcdn.net/v/t45.5328-4/270794502_5429697883712834_4537202726516687572_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=c48759&_nc_eui2=AeFJtj5D7k-k7iViiif5IpGfiutrXV069M2K62tdXTr0zbFGUWGrrCYkH3yC4mVV_EJoGc55HxU20uTU2fSI2-_0&_nc_ohc=gU-xHTvY5SIAX9dwM3O&_nc_oc=AQk8-A4I9Spqb0aVLFj3y-9ewr91gUFqu2XF9j5wxyvAahE_8CDMBV-sVPBvKNlEnZ4&_nc_ht=scontent.falg7-2.fna&oh=00_AT8A4Xu6tx9HhdGDYs34li-tJo-QyDfj7Z-LqTcUsatxOw&oe=61E3F62D",
  },
  {
    productId: "1005002267807452",
    title:
      "Station de charge USB type-c, double chargeur rapide pour manette de jeu sans fil PS5 Sony PS5, Joystick, nouveau",
    price: 1820,
    imageUrl:
      "https://scontent.falg7-2.fna.fbcdn.net/v/t45.5328-4/271663465_7040418629333498_1834753148502805706_n.png?_nc_cat=102&ccb=1-5&_nc_sid=c48759&_nc_eui2=AeGwaut4JiCiG8QJMarREZkSOiMBtvPYpgM6IwG289imA7bHawS2bHxrYlHR6Fxk9HTuJZ-YU9TaDNGuovjdpB9t&_nc_ohc=nMF8V-wA61oAX9bB33S&_nc_ht=scontent.falg7-2.fna&oh=00_AT-st8JWsd6zE4y6575hAecVXka7eLuyFaVIr0shBUpKfg&oe=61E46EBE",
  },
  {
    productId: "32982338666",
    title:
      "CURREN - Montre sports décontractée pour homme, avec cadran bleu, marque de luxe, design militaire, bracelet en cuir, avec fonction chronographe",
    price: 4400,
    imageUrl:
      "https://scontent.falg7-2.fna.fbcdn.net/v/t45.5328-4/269733481_6741792422562525_7849166460208457214_n.png?_nc_cat=102&ccb=1-5&_nc_sid=c48759&_nc_eui2=AeEGiSfAXMOtRO4DqJYvZ64t4m7HjFcH5FribseMVwfkWuUfV39bbS16L_yPacrZjCfge0aasZ4XGIkMrPJOqDEF&_nc_ohc=UfTTEggzre0AX8qOUrV&_nc_ht=scontent.falg7-2.fna&oh=00_AT_thDWvkKLlkIQJw3wnEFMlRaIntcqG7ALJodY_TtWo9Q&oe=61E51C15",
  },
  {
    productId: "4000221564936",
    title:
      "HUAWEI - montre connectée GT 2, Version globale, moniteur d'oxygène dans le sang, 14 jours, appels téléphoniques, moniteur de fréquence cardiaque",
    price: 28110,
    imageUrl:
      "https://scontent.falg7-2.fna.fbcdn.net/v/t45.5328-4/271729381_4876476655751172_1828013309345880412_n.png?_nc_cat=106&ccb=1-5&_nc_sid=c48759&_nc_eui2=AeFjCXgCtN1U8WUv5xU1o7BhufxxrmMUtHa5_HGuYxS0dp7HmkxdA2AuBoAZEuzOKzCV3JnM0TCKTw3pyYnbT1xp&_nc_ohc=h0AR6k_YiEwAX-fSp0x&_nc_ht=scontent.falg7-2.fna&oh=00_AT_fNBovSee7-U8jw0JZsEuJz5zj-zoAdZsGWmmiBAavGQ&oe=61E51972",
  },
  {
    productId: "1005001695423683",
    title:
      "Boîtier de chargement de batterie GoPro 10 9, 3 voies, boîte de rangement de batterie 1750mAh, pour Go pro Hero 9 10, accessoires",
    price: 4020,
    imageUrl:
      "https://scontent.falg7-2.fna.fbcdn.net/v/t45.5328-4/271746613_6979946605356611_4222131127173680064_n.png?_nc_cat=110&ccb=1-5&_nc_sid=c48759&_nc_eui2=AeEpbh04yjF_woMXSnnOqBbRSo2qQUtREDNKjapBS1EQMzCn7VNkD58aMrOVLc59_WuHJh5744ZlGyElbLRAM8ic&_nc_ohc=RwDpDaFCYKgAX9N2XBQ&_nc_ht=scontent.falg7-2.fna&oh=00_AT8-PxbsyIfdWICU22pNkjF5z3z1zkWNfEwZBUCbVx6Hlg&oe=61E5090D",
  },
  {
    productId: "4000527881270",
    title:
      "Jeu de clés pour réparation de voiture, clés à cliquet, à douille, tournevis, kit d'outils professionnels pour le travail des métaux, 46 pièces",
    price: 1160,
    imageUrl:
      "https://scontent.falg7-1.fna.fbcdn.net/v/t45.5328-4/269716847_7020471041304063_4893834979705964166_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=c48759&_nc_eui2=AeHfRncn8uA-nUmPiglUkx_WSyG_jEIYpbBLIb-MQhilsAz57mhBouXG6IGDuKnn9CoOoWtt_gCv-MmWuH9LHEO6&_nc_ohc=y7YqDq4SrEEAX-mLnpM&_nc_ht=scontent.falg7-1.fna&oh=00_AT_XTWJUF9-xdc5llitVW-pPllv7-mVUuVLopSm7u2ck0A&oe=61E34FFD",
  },
  {
    productId: "1005003069212059",
    title:
      "OnePlus - écouteurs Bluetooth 5.2 TWS Buds Pro, Version globale, stop-bruit adaptatif, LHDC, sans fil, pour OnePlus 9 Pro",
    price: 20500,
    imageUrl:
      "https://scontent.falg7-1.fna.fbcdn.net/v/t45.5328-4/270297580_4559518584145267_5252673246452172370_n.png?_nc_cat=104&ccb=1-5&_nc_sid=c48759&_nc_eui2=AeHYBcrX7lKSS2EdopeQhgHUoeMceqaj4HKh4xx6pqPgcvWv8wtj6BYV4W5nZ8xkd4j0aydN_sduVAM4v4nci2Tq&_nc_ohc=tAiKwfDkMJEAX8f3k55&_nc_ht=scontent.falg7-1.fna&oh=00_AT-boZixYALprzRDIsmHOgVh7O8-44Vqeyt_hZZQ3JHZdQ&oe=61E44AB1",
  },
  {
    productId: "4001248951692",
    title:
      "Xiaomi - boîtier de clé TV Mi TV, Android 9.0, 4 cœurs, 1080P HD, double décodage, 1 go de RAM, 8 go de ROM, Google Assistant, Netflix, Wifi 5",
    price: 8970,
    imageUrl:
      "https://scontent.falg7-1.fna.fbcdn.net/v/t45.5328-4/271599112_4636096359839585_4443431468991426219_n.png?_nc_cat=105&ccb=1-5&_nc_sid=c48759&_nc_eui2=AeGk_eY5pq11-E6hWpK2MwMa4DaOsYElITjgNo6xgSUhOHDpP5MQLFigB3ERzAnlKnOg4aDYWolEn7-c3VTORuCZ&_nc_ohc=ybswGgGhB8MAX-YLDOl&_nc_ht=scontent.falg7-1.fna&oh=00_AT8NcO9n4NZCjqGAvp0SODKo4Lb4XxqOmUQGaPK3wHq5nw&oe=61E3E393",
  },
  {
    productId: "4000080371838",
    title:
      "Particules fluorescentes style poudre de sable,gravier nocturne scintillant, pigment brillant, super lumineuses, DIY, 10g",
    price: 220,
    imageUrl:
      "https://scontent.falg7-2.fna.fbcdn.net/v/t45.5328-4/270042617_6745205978884277_7022544573000611322_n.png?_nc_cat=103&ccb=1-5&_nc_sid=c48759&_nc_eui2=AeFD4NJynBhWaOsNIJhEkkFyje6fg1LbQhuN7p-DUttCGwwbtHfyxTVKQfGd6F_IoRHzFqRpCvTf5wnwFnlMQf8J&_nc_ohc=mubtsW0PLt0AX-W5e6u&_nc_ht=scontent.falg7-2.fna&oh=00_AT9FIjrA3Dqnz2T4QIrBH7fwatAwmwuCEEdwCKPJ2QANUA&oe=61E42E7C",
  },
];

const RecommendedProducts = () => {
  const router = useRouter();

  return (
    <div className="my-8">
      <h1 className="text-2xl w-full text-center">
        Facebook shop recommendations
      </h1>
      <div className="flex overflow-x-auto">
        {products.map((product: IProduct) => (
          <div key={product.productId} className="my-8 mx-3 w-50 h-50">
            <Link href={`/aliexpress/product/${product.productId}`} passHref>
              <div className="flex justify-center items-center w-52 h-52 overflow-hidden bg-gray-200 cursor-pointer">
                <img
                  className="w-50 h-50 hover:opacity-75 rounded-lg shadow-lg"
                  src={product.imageUrl}
                  alt={product.title}
                />
              </div>
            </Link>
            <div>
              <div className="w-52">
                <h1 className="mt-2 text-sm h-5 overflow-hidden">
                  <Link href={`/aliexpress/product/${product.productId}`}>
                    {product.title}
                  </Link>
                </h1>
                <p
                  className={`mt-1 text-lg font-medium ${
                    router.locale === "ar" && "flex flex-row-reverse"
                  }`}
                >
                  <span>{product.price}</span> <span>DZD</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
