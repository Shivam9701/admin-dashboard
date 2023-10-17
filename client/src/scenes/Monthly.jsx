
import { Box, useTheme } from "@mui/material"
import { useMemo } from "react"
import Header from "../components/Header"
import { useGetSalesQuery } from "../state/api"
import { ResponsiveLine } from '@nivo/line'



const Monthly = () => {

    const { data, isLoading } = useGetSalesQuery();
    const theme = useTheme();

    const [formattedData] = useMemo(() => {

        if (!data)
            return [];

        console.log(data[0]);

        const { monthlyData } = data[0];

        const totalSalesLine = {
            id: "totalSales",
            color: theme.palette.secondary.main,
            data: [],
        };

        const totalUnitsLine = {
            id: "totalUnits",
            color: theme.palette.secondary[600],
            data: [],
        };

        Object.values(monthlyData).forEach(
            ({ month, totalSales, totalUnits }) => {

                totalSalesLine.data.push({ x: month, y: totalSales });
                totalUnitsLine.data.push({ x: month, y: totalUnits });

            }
        )


        const formattedData = [totalSalesLine, totalUnitsLine];

        return [formattedData];

    }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        (isLoading || !data) ? <div>Loading...</div> :
            <Box m="1.5rem 2.5rem">

                <Header title="Monthly Overview" subtitle="Chart of Monthly sales" />
                <Box height="75vh">

                    {
                        data ?
                            <ResponsiveLine
                                data={formattedData}
                                theme={{
                                    axis: {
                                        domian: {
                                            line: {
                                                stroke: theme.palette.secondary[800]
                                            }
                                        },
                                        legend: {
                                            text: {
                                                fill: theme.palette.secondary[200]
                                            }
                                        },
                                        ticks: {
                                            line: {
                                                stroke: theme.palette.secondary[200],
                                                strokeWidth: 1
                                            },
                                            text: {
                                                fill: theme.palette.secondary[200],
                                            }

                                        },
                                    },
                                    legends: {
                                        text: {
                                            fill: theme.palette.secondary[200]
                                        }
                                    },
                                    tooltip: {
                                        container: {

                                            color: theme.palette.primary[200],
                                        }
                                    }
                                }}
                                colors={{ datum: "color" }}
                                margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
                                xScale={{ type: 'point' }}
                                yScale={{
                                    type: 'linear',
                                    min: 'auto',
                                    max: 'auto',
                                    stacked: false,
                                    reverse: false
                                }}
                                axisTop={null}
                                axisRight={null}
                                axisBottom={{
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: 90,
                                    legend: "Month",
                                    legendOffset: 60,
                                    legendPosition: 'middle'
                                }}
                                axisLeft={{
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: 0,
                                    legend: `Total`,
                                    legendOffset: -50,
                                    legendPosition: 'middle'
                                }}
                                enableGridX={false}
                                enableGridY={false}
                                pointSize={4}
                                pointColor={{ from: 'color', modifiers: [] }}
                                pointBorderWidth={2}
                                pointBorderColor={{ from: 'serieColor' }}
                                pointLabelYOffset={-12}
                                useMesh={true}
                                legends={
                                    [
                                        {
                                            anchor: 'top-right',
                                            direction: 'column',
                                            justify: false,
                                            translateX: 50,
                                            translateY: 0,
                                            itemsSpacing: 0,
                                            itemDirection: 'left-to-right',
                                            itemWidth: 80,
                                            itemHeight: 20,
                                            itemOpacity: 0.75,
                                            symbolSize: 12,
                                            symbolShape: 'circle',
                                            symbolBorderColor: 'rgba(0, 0, 0, .5)',
                                            effects: [
                                                {
                                                    on: 'hover',
                                                    style: {
                                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                                        itemOpacity: 1
                                                    }
                                                }
                                            ]
                                        }
                                    ]}
                            /> : <div>Loading...</div>
                    }
                </Box>
            </Box>
    )

}

export default Monthly