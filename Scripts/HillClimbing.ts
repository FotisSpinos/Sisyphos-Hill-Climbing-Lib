import { BaseHeuristic } from "../Abstract/BaseHeuristic";
import { BaseHillClimbingState } from "../Abstract/BaseHillClimbingState";
import { IIterativeSearch } from "../Interfaces/IIterativeSearch";

export class HillClimbing <T extends BaseHillClimbingState> {
    state: T;
    heuristic: BaseHeuristic;
    isCompleted: boolean;

    constructor(state: T, heuristic: BaseHeuristic) {
        this.state = state;
        this.heuristic = heuristic;
        this.isCompleted = false;
    }

    iterateOnce() : T {
        let currentState = this.state;
        let nextState = null;
        let neighbors = currentState.expand(this.state)

        let startStateEvaluation = this.heuristic.evaluate(currentState);
        let max = startStateEvaluation;

        for (let i = 0; i < neighbors.length; i++) {
            let evaluation = this.heuristic.evaluate(neighbors[i])

            if (evaluation > max) {
                max = evaluation
                nextState = neighbors[i]
            }
        }
        
        console.log(`max evaluation ${max} start evaluation ${startStateEvaluation}`)
        
        if (nextState == null) {
            this.isCompleted = true;
        }
        else {
            this.state = nextState;
        }

        return this.state;
    }

    completeSearch(): T {
 
        while(!this.isCompleted){
            this.iterateOnce();
        }

        return this.state;
    }
}