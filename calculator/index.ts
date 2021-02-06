import Fractions from '../constants/Fractions'

export type CalculateDimensionsProps = {
    boardWidth: number
    costPerBoardFt: number
    depth: number
    diameter: number
    staveCount: number
    stripeWidth?: number
    thickness: number
}

export type CalculatedDimensions = {
    bevelAngle: number
    boardFtRequired: number
    boardLengthRequired: number
    costPerShell: number
    roughDiameter: number
    finishedDiameter: number
    jointAngle: number
    mainWoodOuterWidth: number
    staveLength: number
    staveOuterWidth: number
    stavesPerLength: number
    stavesPerWidth: number
}

export function calculateDimensions({
    boardWidth,
    costPerBoardFt,
    depth,
    diameter,
    staveCount,
    stripeWidth = 0,
    thickness,
}: CalculateDimensionsProps): CalculatedDimensions {
    const roughDiameter = diameter + Fractions.oneEighth
    const finishedDiameter = diameter - Fractions.oneEighth
    const jointAngle = 360 / staveCount
    const bevelAngle = 180 / staveCount
    const staveOuterWidth = getStaveOuterWidth(roughDiameter, staveCount)
    const mainWoodOuterWidth = staveOuterWidth - stripeWidth
    const staveLength = depth + Fractions.oneQuarter
    const stavesPerWidth = Math.floor(boardWidth / mainWoodOuterWidth)
    const stavesPerLength = Math.ceil(staveCount / stavesPerWidth)
    const boardLengthRequired = Math.ceil(stavesPerLength * staveLength)
    const boardFtRequired = roundBy((boardWidth * boardLengthRequired * thickness) / 144, Fractions.oneQuarter)
    const costPerShell = costPerBoardFt * boardFtRequired

    return {
        bevelAngle,
        boardFtRequired,
        boardLengthRequired,
        costPerShell,
        roughDiameter,
        finishedDiameter,
        jointAngle,
        mainWoodOuterWidth,
        staveLength,
        staveOuterWidth,
        stavesPerLength,
        stavesPerWidth,
    }
}

function getStaveOuterWidth(roughDiameter: number, staveCount: number) {
    const multipleFactor = Fractions.oneSixteenth
    return roundBy((roughDiameter * Math.PI) / staveCount + multipleFactor, multipleFactor)
}

function roundBy(number: number, factor: number) {
    return Math.round(number / factor) * factor
}
