import {useQuery} from "react-query";
import {GenreService} from "@/services/genre.service";
import {IMenuItem} from "@/components/layout/Navigation/MenuContainer/menu.interface";
import {getGenreUrl} from "@/config/url.config";

export const usePopularGenres = () => {
  const queryData = useQuery('popular genres menu', () => GenreService.getAll(), {
    select:
      ({data}) => data
        .map(
          (genre): IMenuItem =>
            ({
              icon: genre.icon,
              link: getGenreUrl(genre.slug),
              title: genre.name
            })
        )
        .splice(0, 4),
  })

  return queryData
}