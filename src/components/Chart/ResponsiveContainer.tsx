import React, {
    FunctionComponent,
    useEffect,
    useRef,
    useState
} from 'react';
import { getApiData } from './Api';
import {
    ChartApiProps,
    ChartData
} from './types';

interface Props {
    setWidth: (width: number) => void
    height: number,
    api: ChartApiProps,
    setData: (data: ChartData) => void
}

const ResponsiveContainer: FunctionComponent<Props> = ({
    setWidth,
    height,
    api,
    setData,
    children
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(true);

    const handleResize = () => {
        if (containerRef.current && containerRef.current.clientWidth) {
            setWidth(containerRef.current.clientWidth);
        }
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    useEffect(() => {
        setLoading(true);
        getApiData(api)
            .then(results => {
                setData(results);
            })
            .catch(() => ({}))
            .finally(() => {
                setLoading(false);
            });
    }, [api])

    return (
        <div ref={containerRef}>
            <div style={{ height }}>
                { !loading && children }
            </div>
        </div>
    );
}

export default ResponsiveContainer;