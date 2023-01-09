import {FC} from 'react';
import {useQuery} from "react-query";
import {MovieService} from "@/services/movie.service";
import {SkeletonLoader} from "@/ui/SkeletonLoader";
import {MoviesList} from "@/components/layout/Sidebar/Search/MoviesContainer/MoviesList";

interface IPopularMoviesProps {
}

export const PopularMovies: FC<IPopularMoviesProps> = () => {
  const {isLoading, data: popularMovies} = useQuery(
    'Popular movies in sidebar',
    () => MovieService.getMostPopularMovies(),
    {select: (data) => data.slice(0,3)}
    )
  return isLoading
    ? <div className={'mt-11'}>
        <SkeletonLoader count={3} className={"h-28 mb-4"}/>
      </div>
    : <MoviesList link={'/trending'} movies={popularMovies || []} title={'Popular Movies'}/>
};