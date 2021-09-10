export interface IWilaya {
  id: number;
  name: string;
  postalCode: string;
  dairas?: Array<{
    name: string;
    communes: Array<{
      name: string;
      postalCode: string;
      otherPosts?: Array<{ name: string; postalCode: string }>;
    }>;
  }>;
  address?: Array<{
    name: string;
    postalCode: string;
    otherPosts?: Array<{ name: string; postalCode: string }>;
  }>;
  towns?: Array<{
    name: string;
    postalCode: string;
    otherPosts?: Array<{ name: string; postalCode: string }>;
  }>;
}

import * as Adrar from "./Adrar.json";
import * as Chlef from "./Chlef.json";
import * as Laghouat from "./Laghouat.json";
import * as OumElBouaghi from "./OumElBouaghi.json";
import * as Batna from "./Batna.json";
import * as Bejaia from "./Bejaia.json";
import * as Biskra from "./Biskra.json";
import * as Bechar from "./Bechar.json";
import * as Blida from "./Blida.json";
import * as Bouira from "./Bouira.json";
import * as Tamanrasset from "./Tamanrasset.json";
import * as Tebessa from "./Tebessa.json";
import * as Tlemcen from "./Tlemcen.json";
import * as Tiaret from "./Tiaret.json";
import * as TiziOuzou from "./TiziOuzou.json";
import * as Alger from "./Alger.json";
import * as Djelfa from "./Djelfa.json";
import * as Jijel from "./Jijel.json";
import * as Setif from "./Setif.json";
import * as Saida from "./Saida.json";
import * as Skikda from "./Skikda.json";
import * as SBA from "./SBA.json";
import * as Annaba from "./Annaba.json";
import * as Guelma from "./Guelma.json";
import * as Constantine from "./Constantine.json";
import * as Medea from "./Medea.json";
import * as Mostaganem from "./Mostaganem.json";
import * as Msila from "./Msila.json";
import * as Mascara from "./Mascara.json";
import * as Ouargla from "./Ouargla.json";
import * as Oran from "./Oran.json";
import * as ElBayadh from "./ElBayadh.json";
import * as Illizi from "./Illizi.json";
import * as BBA from "./BBA.json";
import * as Boumerdes from "./Boumerdes.json";
import * as ElTarf from "./ElTarf.json";
import * as Tindouf from "./Tindouf.json";
import * as Tissemsilt from "./Tissemsilt.json";
import * as ElOued from "./ElOued.json";
import * as Khenchela from "./Khenchela.json";
import * as SoukAhras from "./SoukAhras.json";
import * as Tipaza from "./Tipaza.json";
import * as Mila from "./Mila.json";
import * as AinDefla from "./AinDefla.json";
import * as Naama from "./Naama.json";
import * as AinTemouchent from "./AinTemouchent.json";
import * as Ghardaia from "./Ghardaia.json";
import * as Relizane from "./Relizane.json";

const Wilayas: IWilaya[] = [
  Adrar,
  Chlef,
  Laghouat,
  OumElBouaghi,
  Batna,
  Bejaia,
  Biskra,
  Bechar,
  Blida,
  Bouira,
  Tamanrasset,
  Tebessa,
  Tlemcen,
  Tiaret,
  TiziOuzou,
  Alger,
  Djelfa,
  Jijel,
  Setif,
  Saida,
  Skikda,
  SBA,
  Annaba,
  Guelma,
  Constantine,
  Medea,
  Mostaganem,
  Msila,
  Mascara,
  Ouargla,
  Oran,
  ElBayadh,
  Illizi,
  BBA,
  Boumerdes,
  ElTarf,
  Tindouf,
  Tissemsilt,
  ElOued,
  Khenchela,
  SoukAhras,
  Tipaza,
  Mila,
  AinDefla,
  Naama,
  AinTemouchent,
  Ghardaia,
  Relizane,
];

export default Wilayas;
