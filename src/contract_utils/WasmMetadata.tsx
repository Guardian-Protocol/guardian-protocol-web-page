import { useEffect, useState } from 'react';
import { Buffer } from 'buffer';

export const useWasmMetadata = (source: RequestInfo | URL) => {

  const [data, setData] = useState<Buffer>();
  
  useEffect(() => {
    if(source) {
      fetch(source)
      .then((response) => response.arrayBuffer())
      .then((array) => Buffer.from(array))
      .then((buffer) => setData(buffer))
      .catch(({ message }: Error) => console.error(`Fetch error: ${message}`));

    }
  }, [source])

  return { buffer: data };
};
