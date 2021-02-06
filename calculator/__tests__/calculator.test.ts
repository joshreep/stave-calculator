import { calculateDimensions, CalculatedDimensions } from '../index'

describe('stave calculator', () => {
    let result: CalculatedDimensions
    beforeEach(() => {
        result = calculateDimensions({
            boardWidth: 6,
            costPerBoardFt: 4.6,
            depth: 7.5,
            diameter: 14,
            staveCount: 20,
            thickness: 0.75,
        })
    })

    test('should calculate the bevel angle', () => {
        expect(result.bevelAngle).toBe(9)
    })

    test('should calculate the board feet required', () => {
        expect(result.boardFtRequired).toBe(2.5)
    })

    test('should calculate the board length required', () => {
        expect(result.boardLengthRequired).toBe(78)
    })

    test('should calculate cost per shell', () => {
        expect(result.costPerShell).toBe(11.5)
    })

    test('should calculate the rough diameter', () => {
        expect(result.roughDiameter).toBe(14.125)
    })

    test('should calculate finished diameter', () => {
        expect(result.finishedDiameter).toBe(13.875)
    })

    test('should calculate joint angle', () => {
        expect(result.jointAngle).toBe(18)
    })

    test('should calculate main wood outer width', () => {
        expect(result.mainWoodOuterWidth).toBe(2.25)
    })
})
