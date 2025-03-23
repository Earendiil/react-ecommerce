
import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'

export default function ProductViewModal({open, setOpen, product, isAvailable}){

    
    
    const {image, productId, productName, description, 
           quantity, price ,discount, specialPrice,} = product;
    
    const handleClickOpen = () => {
        setOpen(true);
    }

    
      return (
        <div >
         
    
          <Dialog open={open} as="div" className="relative z-10 " onClose={close} __demoMode>
          <DialogBackdrop className="fixed inset-0 bg-black/30 " />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <DialogPanel
                  transition
                  className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all md:max-w[1024px] md:min-[620px] w-full">
                   
                  { image && (
                        <div className='flex justify-center aspect-[4/3] max-h-150 max-w 150'>
                        <image
                        src={image} 
                        alt={productName} />
                        </div>
                    )}
                
                
                  <DialogTitle as="h3" className="text-base/7 font-medium text-slate-800">
                    {productName}
                  </DialogTitle>
                  <p className="mt-2 text-sm/6 text-slate-800">
                   {description}
                  </p>
                  <div className="mt-4">
                    <Button
                      className="inline-flex justify-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                      onClick={() => setOpen(false)}
                    >
                      Got it, thanks!
                    </Button>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        </div>
      )
    
    
}