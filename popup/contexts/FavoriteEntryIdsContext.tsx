import { useAtomValue } from "jotai";
import { createContext, useContext, type PropsWithChildren } from "react";

import { useCloudFavoritedEntriesQuery } from "~popup/hooks/useCloudFavoritedEntriesQuery";
import { favoriteEntryIdsAtom } from "~popup/states/atoms";

const FavoriteEntryIdsContext = createContext<Set<string>>(new Set());

export const FavoriteEntryIdsProvider = ({ children }: PropsWithChildren) => {
  const favoriteEntryIds = useAtomValue(favoriteEntryIdsAtom);
  const cloudFavoritedEntriesQuery = useCloudFavoritedEntriesQuery();
  const cloudFavoriteEntries = cloudFavoritedEntriesQuery.data?.entries || [];

  return (
    <FavoriteEntryIdsContext.Provider
      value={new Set([...favoriteEntryIds, ...cloudFavoriteEntries.map((entry) => entry.id)])}
    >
      {children}
    </FavoriteEntryIdsContext.Provider>
  );
};

export const useFavoriteEntryIds = () => {
  return useContext(FavoriteEntryIdsContext);
};
