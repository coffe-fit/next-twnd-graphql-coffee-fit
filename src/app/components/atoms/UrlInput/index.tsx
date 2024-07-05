import { language } from '@/lib/lenguage';
import { FormEvent, useState, useEffect } from 'react';

interface UrlInputProps {
  mediaType: 'photo' | 'video';
  shortText: string;
  longText: string;
  iconColor: string;
  name: string;
  initialUrl?: string;
  onUrlChange: (name: string, url: string) => void;
}

export const UrlInput: React.FC<UrlInputProps> = ({ mediaType, shortText, longText, iconColor, name, initialUrl, onUrlChange }) => {
  const [url, setUrl] = useState<string>(initialUrl || '');
  const _language = language('español');
  useEffect(() => {
    if (initialUrl) {
      setUrl(initialUrl);
    }
  }, [initialUrl]);

  const handleSubmit = (e: FormEvent, url: string) => {
    e.preventDefault();
    console.log(url);
  };

  const handleButtonClick = () => {
    const url = prompt(`${_language.inputUrl} ${mediaType === 'photo' ? _language.image : _language.video}:`);
    if (url) {
      setUrl(url);
      onUrlChange(name, url);
      handleSubmit({ preventDefault: () => {} } as FormEvent, url);
    }
  };

  const handleEditClick = () => {
    const url = prompt(`${_language.inputUrl} ${mediaType === 'photo' ? _language.image : _language.video}:`);
    if (url) {
      setUrl(url);
      onUrlChange(name, url);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <form className="flex flex-col items-center">
        <input
          type="hidden"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <div className="relative w-16 h-16 mb-4">
          <button
            type="button"
            onClick={handleButtonClick}
            className="flex items-center justify-center w-full h-full rounded-full bg-transparent border border-gray-300"
            title={longText}
          >
            <span className="sr-only">Submit {mediaType === 'photo' ? 'Photo' : 'Video'}</span>
            {url ? (
              mediaType === 'photo' ? (
                <img src={url} alt="Uploaded media" className="w-full h-full rounded-full object-cover" />
              ) : (
                <video className="w-full h-full rounded-full object-cover" controls>
                  <source src={url} type="video/mp4" />
                  Tu navegador no soporta la etiqueta de video.
                </video>
              )
            ) : mediaType === 'photo' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-8 w-8 ${iconColor}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89-3.26a1 1 0 01.72 0L21 8m-2 12H5a2 2 0 01-2-2V8c0-.53.21-1.04.59-1.41A2 2 0 015 6h14a2 2 0 012 2v10a2 2 0 01-2 2zm-7-4a4 4 0 100-8 4 4 0 000 8z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-8 w-8 ${iconColor}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 10v4a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 12c0-4.971-4.029-9-9-9S3 7.029 3 12s4.029 9 9 9 9-4.029 9-9z"
                />
              </svg>
            )}
          </button>
          {url && (
            <button
              type="button"
              onClick={handleEditClick}
              className="absolute top-0 right-0 mt-1 mr-1 bg-white rounded-full p-1 border border-gray-300"
              title="Editar URL"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232a3 3 0 014.243 4.243l-10 10a3 3 0 01-1.414.798l-4 1a1 1 0 01-1.213-1.213l1-4a3 3 0 01.798-1.414l10-10z"
                />
              </svg>
            </button>
          )}
        </div>
        <p className="text-gray-600 mb-4">{shortText}</p>
      </form>
    </div>
  );
};