import  styled  from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  position: relative;
`;

export const HistoricalDatesLabel = styled.div`
  position: absolute;
  left: calc((100% - 1200px) / 2 + 20px); // 20px отступа от линии
  top: 20px;
  width: 353px;
  font-size: 48px;
  font-weight: bold;
  color: #42567A;
  z-index: 10;
`;

export const CircleContainer = styled.div`
  position: relative;
  width: 530px;
  height: 530px;
  margin: 0 auto ;
`;

export const CircleWrapper = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #42567A;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: visible; // Добавлено для корректного отображения
`;

export const GlobalLinesContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

export const CentralCrossLine = styled.div<{ orientation: 'horizontal' | 'vertical' }>`
  position: absolute;
  opacity: 10%;
  background: #42567A;
  ${({ orientation }) => orientation === 'horizontal' ? `
    width: 100%;
    height: 1px;
    top: 35%;
    left: 0;
  ` : `
    width: 1px;
    height: 100%;
    left: 50%;
    top: 0;
  `}
`;

export const LeftVerticalLine = styled.div`
  position: absolute;
  opacity: 10%;
  background: #42567A;
  width: 1px;
  height: 100%;
  left: calc((100% - 1200px) / 2 - 20px); // 20px отступа от основного контейнера
  top: 0;
`;


export const YearDisplay = styled.div`
  font-size: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px; // Увеличил отступ между цифрами
  position: relative;
  z-index: 20;
`;

export const YearNumber = styled.div<{color: string}>`
  display: inline-block;
  min-width: 60px;
  text-align: center;
  color: ${props => props.color};
  z-index: 20; // Добавлен z-index
  position: relative;
`;


export const PointsContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

export const PeriodPoint = styled.div<{ angle: number, active: boolean }>`
  position: absolute;
  width: ${props => props.active ? '40px' : '16px'};
  height: ${props => props.active ? '40px' : '16px'};
  background: ${props => props.active ? '#FFFFFF' : '#42567A'};
  border: ${props => props.active ? '2px solid #42567A' : 'none'};
  border-radius: 50%;
  top: 50%;
  left: 50%;
  margin: ${props => props.active ? '-20px 0 0 -20px' : '-8px 0 0 -8px'};
  transform: 
    rotate(${props => props.angle}deg)
    translate(265px)
    rotate(${props => -props.angle}deg);
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2;

  &:hover {
    transform: 
      rotate(${props => props.angle}deg)
      translate(265px)
      rotate(${props => -props.angle}deg)
      scale(1.3);
  }
`;

export const PointNumberWrapper = styled.div<{ angle: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  transform: 
    translate(-50%, -50%)
    rotate(${props => props.angle}deg)
    translate(265px)
    rotate(${props => -props.angle}deg);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 3;
`;

export const PointNumber = styled.div<{ $angle: number }>`
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(${props => props.$angle}deg);
  color: #42567A;
  font-weight: bold;
  font-size: 16px;
  user-select: none;
  margin-left: -1px; // Корректировка для точного центрирования
`;

export const StaticPeriodLabel = styled.div`
  position: absolute;
  top: 67px;
  right: -50px;
  font-weight: bold;
  color: #42567A;
  z-index: 10;
  white-space: nowrap;
  font-size: 16px;
  opacity: 0;
`;

export const EventsGroup = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const EventContainer = styled.div`
  width: 100%;
  padding: 0 10px;
`;

export const EventItem = styled.div`
  margin-bottom: 25px;
`;

export const EventYear = styled.h2`
  font-size: 24px;
  margin-bottom: 5px;
  color: #3877EE;
`;

export const EventDescription = styled.p`
  font-size: 18px;
  line-height: 1.4;
`;

export const YearSliderContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  position: relative;
`;

export const YearSliderWrapper = styled.div`
  position: relative;
  padding: 0 40px;
`;

export const SliderNavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #42567A;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #42567A;
  font-size: 16px;
  padding: 0;
  transition: all 0.2s ease;
  z-index: 10;

  &:hover {
    background: #42567A;
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const PrevSliderButton = styled(SliderNavButton)`
  left: 0;
`;

export const NextSliderButton = styled(SliderNavButton)`
  right: 0;
`;

export const NavigationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  z-index: 10;
`;

export const SlideCounter = styled.span`
  font-size: 14px;
  color: #42567A;
  margin-left: 10px;
`;

export const NavButtons = styled.div`
  display: flex;
  gap: 5px;
`;

export const NavButton = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid #42567A;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #42567A;
  font-size: 14px;
  padding: 0;
  transition: all 0.2s ease;

  &:hover {
    background: #42567A;
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;