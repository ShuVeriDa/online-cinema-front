import {ChangeEvent, useMemo, useState} from "react";
import {useDebounce} from "@/hooks/useDebounce";
import {useMutation, useQuery} from "react-query";
import {ITableItem} from "@/ui/adminTable/AdminTable/admin-table.interface";
import {getAdminUrl} from "@/config/url.config";
import {convertMongoDate} from "@/utils/date/convertMongoDate";
import {toastError} from "@/utils/toastError";
import {toastr} from "react-redux-toastr";
import {GenreService} from "@/services/genre.service";

export const useGenres = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)

  const queryData = useQuery(
    ['genre list', debouncedSearch],
    () => GenreService.getAll(debouncedSearch), {
      select: ({ data }) =>
        data.map(
          (genre): ITableItem => ({
            _id: genre._id,
            editUrl: getAdminUrl(`genre/edit/${genre._id}`),
            items: [genre.name, genre.slug],
          })
        ),

      onError: (error) => {
        toastError(error, 'Genre list')
      }
    }
  )

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value)
  }

  const {mutateAsync: deleteAsync} = useMutation(
    'delete genre',
    (genreId: string) => GenreService.delete(genreId),
    {
      onError: (error) => {
        toastError(error, 'Delete genre')
      },
      onSuccess: () => {
        toastr.success("Delete genre", 'delete was successful')
        queryData.refetch()
      }
    }
  )

  return useMemo(
    () => ({
      handleSearch,
      ...queryData,
      searchTerm,
      deleteAsync,
    }),
    [queryData, searchTerm, deleteAsync]
  )
}