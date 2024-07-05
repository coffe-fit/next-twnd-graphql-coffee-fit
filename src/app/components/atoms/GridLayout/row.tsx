import Image, { StaticImageData } from 'next/image';

interface props {
  item: any,
  index: number,
  headers: any,
  imageLeft?: string | StaticImageData | any, // Nueva propiedad opcional para la imagen a la izquierda
  btns: {
    name: string,
    img: string | StaticImageData,
    imgDark?: string | StaticImageData,
    action: (item: any) => void
  }[],
  _headLength: number,
  showOnlyColumns?: string[],
  maskField: (e: any) => void,
  classNameRow?: string
}

export const Row = ({
  item,
  index,
  headers,
  imageLeft, // Asegurarse de recibir la nueva propiedad
  btns,
  _headLength,
  showOnlyColumns,
  maskField,
  classNameRow
}: props) => {
  const field = (key: any, value: any, isFirstColumn: boolean) => {
    return (
      <div key={`field_${key}_${value}`} id={`field_${key}_${value}`} className={`
        flex items-center truncate ${isFirstColumn && 'max-md:w-52'} // ancho fijo para la primera columna
        ${key === headers[headers.length - 1] && !btns ? "" : ""}
      `}>
        {isFirstColumn && imageLeft && (
          <img
            src={typeof imageLeft === 'string' ? imageLeft : imageLeft.src}
            alt="Left Image"
            width={43} // Ajustar el tamaño según sea necesario
            height={43} // Ajustar el tamaño según sea necesario
            className={`
            rounded-full
            flex-row
            sm:h-10 sm:w-10
            h-9 w-9
            mx-2
            `} // Añadir margen a la derecha para separar la imagen del texto
          />
        )}
        {value ? (<>{maskField(value)}</>) : (<></>)}
      </div>
    );
  };

  return (
    <div className={`w-full`} key={`div_${index}`} id={`div_${index}`}>

      {/* Renderizar datos */}
      <div
        id={`row_${index}`}
        key={`row_${index}`}
        className={`
          ${classNameRow} 
          grid row-auto
          grid-cols-[auto auto 100px] // Asignar tamaño fijo a la última columna
          gap-2 border cff-border-1
          ${item.resalt ? "animate-pulse backdrop-brightness-200" : null}
          hover:animate-none
          ${index % 2 === 0 ? '' : 'cff-bg-color-green-600 dark:bg-green-500'}
        `}
      >
        {Object.entries(item).map(([key, value], idx) => (
          !showOnlyColumns || showOnlyColumns.includes(key)
            ? (field(key, value, idx === 2)) // Pasar true si es la segunda columna
            : null
        ))}
        {btns && (
          <div className={`flex justify-end relative w-[${btns.length*3}rem)]`}>
            {
              btns.map((btn, index) => (
                <span
                  id={`imageBtn_${index}`}
                  key={`imageBtn_${index}`}
                >
                  <Image
                    className={`
                      ${btn.imgDark && 'cff-flex-row-center dark:hidden'}
                      cff-button
                      rounded-full
                      flex-row
                      border-2
                      sm:h-10 sm:w-10
                      h-9 w-9
                      cursor-pointer
                      ${item.resaltBtn0 && index === 0 ? "animate-pulse" : null}
                      ${item.resaltBtn1 && index === 1 ? "animate-pulse" : null}
                      ${item.resaltBtn2 && index === 2 ? "animate-pulse" : null}
                      hover:animate-none
                      hover:border-gray-300
                    `}
                    src={btn.img}
                    alt=""
                    width={100}
                    height={100}
                    onClick={() => btn.action(item)}
                  />
                  {btn.imgDark && <Image
                    className={`
                      hidden dark:cff-flex-row-center
                      cff-button
                      rounded-full
                      flex-row
                      border-2
                      sm:h-10 sm:w-10
                      h-9 w-9
                      ${item.resaltBtn0 && index === 0 ? "animate-pulse" : null}
                      ${item.resaltBtn1 && index === 1 ? "animate-pulse" : null}
                      ${item.resaltBtn2 && index === 2 ? "animate-pulse" : null}
                      hover:animate-none
                      hover:border-green-400
                    `}
                    src={btn.imgDark}
                    alt=""
                    width={100}
                    height={100}
                    onClick={() => btn.action(item)}
                  />}
                </span>
              ))
            }
          </div>
        )}
      </div>
    </div>
  );
};