import { Income } from "@/types";
import { FC } from "react";
import { platformTypeHandler } from '@/core/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

function dataCombinHandle (incomes: Income[]) {
  const newData = [];
  for (let i = 0; i < labels.length; i++) {
    const newDataItem = new Map()
    for (let d = 0; d < incomes.length; d++) {
      const newKey = platformTypeHandler(incomes[d].platform);
      newDataItem.set([newKey.name],incomes[d].past_incomes[i])
    }
    newData.push({
        name: labels[i],
        ...Object.fromEntries(newDataItem)
      }
    )
  }
  
  return newData
};

const CustomTooltip = ({
  active,
  payload,
  label,
  platform,
}: any) => {
  if (active) {
    return (
      <div className="p-4 rounded-lg backdrop-blur-sm bg-white/30 text-gray-300">
        <p className="label">{label}</p>
        <div className="mt-2 flex flex-col gap-1">
        {payload.map((pld: any) => (
            <div key={pld} className={`flex gap-2 text-sm ${pld.dataKey.toLowerCase() === platform ? "text-[#E3C752]" : "text-[#9c9c9c]"}`}>
              <div>{pld.dataKey}</div>
              <div>{pld.value}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

type IncomesChartProps = {
  incomes: Income[],
  platform: string,
};

export const IncomesChart: FC<IncomesChartProps> = ({incomes, platform}) => {
  const data = dataCombinHandle(incomes);
  
  return(
    <div className='col-span-3'>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
            width={500}
            height={500}
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 25,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} minTickGap={5}/>
            <YAxis />
            <Tooltip content={<CustomTooltip platform={platform}/>}/>
            <Legend />
            {incomes.map((income) =>
              <Line key={income.platform} type="monotone" dataKey={platformTypeHandler(income.platform).name} stroke={`${platformTypeHandler(income.platform).name.toLowerCase() === platform ? "#E3C752" : "#9c9c9c"}`} />
            )}
            {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
      </ResponsiveContainer>
      
    </div>
  )
};
