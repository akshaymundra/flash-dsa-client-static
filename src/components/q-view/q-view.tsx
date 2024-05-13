import { DataRowProps } from "@/types"
import React from "react";
import QLevel from "../atoms/q-level";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import clsx from "clsx";
import hljs from 'highlight.js'
import plainText from 'highlight.js/lib/languages/plaintext';

hljs.registerLanguage('plaintext', plainText);

interface QViewProps {
    data: DataRowProps;
    index: number;
}

const QView: React.FC<QViewProps> = ({
    data,
    index,
}) => {

    const classes = clsx(
        'flex flex-1 flex-col gap-6 p-0 sm:p-4 rounded-lg m-2',
    )


    return (
        <div id={`q-card-${index}`} className={classes}>


            {/* header  */}
            <div className="flex flex-wrap gap-2 sm:gap-4 items-start justify-between">
                <p className="font-semibold max-w-[75%]">
                    Q. {' '}
                    <a
                        href={data.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm sm:text-lg underline text-blue-900 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-300"
                    >
                        {data.name}
                    </a>
                </p>
                <div className="flex gap-4 items-center">

                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-200 uppercase">
                        {data.topic}
                    </p>
                    {data.level && <QLevel className="px-3" level={data.level} />}
                </div>
            </div>


            {/* question part  */}
            <p className="text-sm sm:text-md whitespace-pre-wrap">
                {data.question}.
            </p>

            {/* approact and pseudo code  */}

            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="q-approach">
                    <AccordionTrigger className="text-sm sm:text-md">
                        See Approach
                    </AccordionTrigger>
                    <AccordionContent>
                        <p className="text-md text-gray whitespace-pre-wrap">
                            {data.approach}
                        </p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q-pseudo-code">
                    <AccordionTrigger className="text-sm sm:text-md">
                        See Pseudo Code
                    </AccordionTrigger>
                    <AccordionContent>
                        <pre className="text-sm sm:text-md text-gray whitespace-pre-wrap">
                            <code>
                                {data.pseudo_code && hljs.highlight('plaintext', data?.pseudo_code).code}
                            </code>
                        </pre>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>


        </div>
    )
}


export default QView;