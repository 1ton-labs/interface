import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
} from '@chakra-ui/react';
import { Dispatch, FC, SetStateAction, useState } from 'react';

type SliderBarProps = {
  percentage: number;
  setPercentage: Dispatch<SetStateAction<number>>;
}

const SliderBar:FC <SliderBarProps>= ({
  percentage,
  setPercentage
}) => {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className='p-2'>
      <Slider
      id='slider'
      defaultValue={100}
      min={0}
      max={100}
      colorScheme="twitter"
      onChange={(v) => setPercentage(v)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <SliderMark value={0} mt='1' ml='-2.5' fontSize='sm'>
        0%
      </SliderMark>
      <SliderMark value={25} mt='1' ml='-2.5' fontSize='sm'>
        25%
      </SliderMark>
      <SliderMark value={50} mt='1' ml='-2.5' fontSize='sm'>
        50%
      </SliderMark>
      <SliderMark value={75} mt='1' ml='-2.5' fontSize='sm'>
        75%
      </SliderMark>
      <SliderMark value={100} mt='1' ml='-2.5' fontSize='sm'>
        100%
      </SliderMark>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <Tooltip
        hasArrow
        bg='whiteAlpha.600'
        color='white'
        placement='top'
        isOpen={showTooltip}
        label={`${percentage}%`}
      >
        <SliderThumb />
      </Tooltip>
    </Slider>
    </div>
    
  )
}

export default SliderBar;