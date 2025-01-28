"use client"
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useGetPointById } from '@/root/services/points';
import { useGetDocument } from '@/root/services/mongo';
import { ButtonBack } from '@/shared/Buttons/ButtonBack/ButtonBack';
import { PointScelteton } from '../../PointScelteton';

export default function DocsId() {
    const { pointId, docId } = useParams();
    const { data: pointData } = useGetPointById(pointId as string);
    const [documentId, setDocumentId] = useState<string | null>(null);
    const [iframeSrc, setIframeSrc] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Получаем документ по documentId
    const { data: docData, isLoading: isDocLoading } = useGetDocument(documentId as string);

    useEffect(() => {
        if (pointData && pointData.documents_data) {
            const docIndex = parseInt(docId as string, 10) - 1;
            if (docIndex >= 0 && docIndex < pointData.documents_data.length) {
                const selectedDocument = pointData.documents_data[docIndex];
                setDocumentId(selectedDocument.id);
            } else {
                console.error('Invalid document index');
                setIsLoading(false);
            }
        }
    }, [pointData, docId]);

    useEffect(() => {
        if (docData && docData.document_data && docData.content_type) {
            const base64String = docData.document_data;
            const mimeType = docData.content_type;
            let src = '';
            if (!base64String.startsWith('data:')) {
                src = `data:${mimeType};base64,${base64String}`;
            } else {
                src = base64String;
            }
            setIframeSrc(src);
            setIsLoading(false);
        }
    }, [docData]);

    return (
        <section className="wrapper container">
            {isLoading || isDocLoading ? (
                <PointScelteton/>
            ) : (
                <>
                    <div className="flex-grow">
                        {iframeSrc ? (
                            <iframe
                                src={iframeSrc}
                                className="absolute top-0 left-0 w-full h-full"
                            ></iframe>
                        ) : (
                            <p>No valid document found</p>
                        )}
                    </div>
                    <div className="buttons !backdrop-blur-none">
                        <ButtonBack className="bg-fillColor" />
                    </div>
                </>
            )}
        </section>
    );
}