import React, {useEffect, useState} from 'react';
import {router} from "@inertiajs/react";

export default function Pagination({links, routeRequest, dataRequest}) {

    const [pagingParams, setPagingParams] = useState();

    function getClassName(active) {
        if (active) {
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-main-blue-hover focus:border-primary focus:text-primary bg-gray-300 text-black";
        } else {
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-sky-50 focus:border-primary focus:text-primary";
        }
    }


    const handleClick = (e, url) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(url.split('?')[1]);
        const page = urlParams.get('page');

        dataRequest = {
            ...dataRequest,
            page: page
        }
        setPagingParams(dataRequest)
    };

    useEffect(() => {
        if (pagingParams) {
            router.get(routeRequest, pagingParams, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                onSuccess: (r) => {
                    // console.log(r)
                }
            });
        }
    }, [pagingParams]);

    return (
        links?.length > 3 && (
            <div className="mb-4">
                <div className="flex flex-wrap mt-8">
                    {links.map((link, key) => (
                        link.url === null ?
                            (<div
                                key={'link_' + key}
                                className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded"
                            >{link.label === '&laquo; Previous' ? 'Previous' : link.label === 'Next &raquo;' ? 'Next' : link.label}</div>) :

                            (
                                // Поменял на button, потому что Link не дизейблится
                                <button
                                    key={'link_' + key}
                                    className={getClassName(link.active)}
                                    onClick={(e) => handleClick(e, link.url)}
                                    disabled={link.active}
                                >
                                    {link.label === '&laquo; Previous' ? 'Previous' : link.label === 'Next &raquo;' ? 'Next' : link.label}
                                </button>
                            )
                    ))}
                </div>
            </div>
        )
    );
}
