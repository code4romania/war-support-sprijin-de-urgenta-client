import { ServerErrorByEndpoint } from "api";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

export interface IServerErrorsMessageProps {
  errors: ServerErrorByEndpoint;
}

const ServerErrorsMessage = ({ errors }: IServerErrorsMessageProps) => {
  const { t } = useTranslation('common')
  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        'w-full h-full',
        'border border-gray-200 rounded-md',
        'p-3 mb-3', 'bg-red-50'
      )}
    >
      {Object.keys(errors).map(key => {
        const endpoint = errors[key];
        return (
          <div className="text-white" key={key}>
            <span className="font-bold">{t(`endpoints.${key}`)}</span>
            {endpoint.map(endpoint => {
              return Object.keys(endpoint).map((endpointKey, index) => {
                const error = endpoint[endpointKey]
                return (
                  <div className="pl-2" key={index}>
                    <span className="mr-2">{endpointKey}:</span>
                    {error.map((e, i) => <span key={i}>{e}</span>)}
                  </div>)
              })
            })}
          </div>
        )
      })
      }
    </div>
  )
};

export default ServerErrorsMessage;
