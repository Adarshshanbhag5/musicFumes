import {useEffect, useState} from 'react';
import {useFileSystemStore} from '../zustand/FileSystemStore';

const useHydration = (): boolean => {
  const [hydrated, setHydrated] = useState<boolean>(
    useFileSystemStore.persist.hasHydrated,
  );
  useEffect(() => {
    const unsubHytrate = useFileSystemStore.persist.onHydrate(() =>
      setHydrated(false),
    );
    const unsubFinishHydration = useFileSystemStore.persist.onFinishHydration(
      () => setHydrated(true),
    );
    setHydrated(useFileSystemStore.persist.hasHydrated());
    return () => {
      unsubHytrate();
      unsubFinishHydration();
    };
  }, []);
  return hydrated;
};

export default useHydration;
