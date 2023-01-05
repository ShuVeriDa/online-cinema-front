import {FC} from 'react';
import {ICollection} from "@/screens/collections/collections.interface";
import {Meta} from "@/utils/meta/Meta";
import {Heading} from "@/ui/heading/Heading";

import styles from './Collections.module.scss';
import {Description} from "@/ui/heading/Description";
import {CollectionsItem} from "@/screens/collections/CollectionsItem";

interface ICollectionsProps {
}

const title = 'Discovery'
const description = 'In this section you will find all genres on our site'

export const Collections: FC<{ collections: ICollection[] }> = ({collections}) => {
  return (
    <Meta title={title} description={description}>
      <Heading title={title} className={styles.heading}/>
      <Description text={description} className={styles.description}/>

      <section className={styles.collections}>
        {collections.map(c => <CollectionsItem key={c._id} collection={c}/>)}
      </section>
    </Meta>
  );
};