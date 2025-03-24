import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { Divider } from '@mui/material';
import Status from './Status';
import { MdClose, MdDone } from 'react-icons/md';

export default function ProductViewModal({ open, setOpen, product, isAvailable }) {
    
    const { image, productId, productName, description, 
           quantity, price, discount, specialPrice } = product || {};

    return (
        <div>
            <Dialog open={open} as="div" className="relative z-10" onClose={() => setOpen(false)}>
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all md:max-w-[1024px] md:min-w-[620px] w-full"
                        >
                            {image && (
                                <div className="flex justify-center aspect-[4/3] max-h-150 max-w-150">
                                    <img 
                                        className="w-full h-auto object-cover"
                                        src={image} 
                                        alt={productName} 
                                    />
                                </div>
                            )}
                            
                            <div className="px-6 pt-10 pb-2">
                                <DialogTitle 
                                    as="h3" 
                                    className="lg:text-3xl sm:text-2xl text-xl font-semibold leading-6 text-gray-800 mb-4"
                                >
                                    {productName}
                                </DialogTitle>
                                
                                <div className="space-y-2 text-gray-700 pb-4">
                                    <div className="flex items-center justify-between"> 
                                        {specialPrice ? (
                                            <div className="flex flex-col">
                                                <span className="text-gray-400 line-through"> 
                                                    ${Number(price).toFixed(2)}
                                                </span>
                                                <span className="text-gray-700 text-xl font-bold"> 
                                                    ${Number(specialPrice).toFixed(2)}
                                                </span>
                                                
                                            </div> 
                                        ) : ( 
                                            <span className="text-gray-700 font-bold">
                                                ${Number(price).toFixed(2)}
                                            </span>
                                        )}
                                          {isAvailable ? (
                                            <Status 
                                            text="In Stock"
                                            icon={MdDone}
                                            bg="bg-teal-200"
                                            color="text-teal-900"
                                            />
                                          ) : (
                                            <Status 
                                            text="Out of Stock"
                                            icon={MdClose}
                                            bg="bg-rose-200"
                                            color="text-rose-900"
                                         /> )
                                        }

                                    </div>
                                       <div>

                                      <Divider />

                                       <p>{description}</p>
                                       </div>
                                         <div className="flex gap-4">
                                            <button className='rounded-lg border px-2 justify-end bg-gray-200 hover:bg-gray-400'
                                              onClick={() => setOpen(false)}>Close</button>
                                        </div>
                                   </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
