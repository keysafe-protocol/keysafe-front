import { ChainType } from 'constants/enum'
import React, { FC, useState } from 'react'
import Dialog from 'rc-dialog'
import { QRCodeCanvas } from 'qrcode.react'
import Button from 'components/button'

interface IQRCode {
  value: string,
  img?: string
}
const useQrcode = () => {
  const [account, setAccount] = useState<IQRCode | null>()
  const Qrcode = () => {
    return <Dialog
      visible={!!account}
      onClose={() => setAccount(null)}
    >
      <main className='flex-col items-center'>

        <div className='mx-auto flex justify-center'>
          <QRCodeCanvas
            value={account?.value!}
            size={256}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"L"}
            includeMargin={false}
            imageSettings={{
              src: account?.img!,
              x: undefined,
              y: undefined,
              height: 64,
              width: 64,
              excavate: true,
            }}
          />
        </div>

        <div className='my-2  text-center'>
          {account?.value}

        </div>
      </main>
    </Dialog >
  }
  return {
    Qrcode, setAccount
  }
}
export default useQrcode 
