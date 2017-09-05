//  Created by Alex Johnson on 3/7/17.
//  Copyright © 2017 Alex Johnson. All rights reserved.


//Alex: 2017-03-31
// This sets the blue box displaying where the visible items take place
func setTimelineCurrentPoint(){
    
    //Get the index Paths for the visible items
    let indexArray:[IndexPath] = myCollectionView.indexPathsForVisibleItems
    
    //Create an empty Int array. This will have the indexes of the visible stories, sorted
    var visibleArray:[Int] = []
    
    //Put the indexes that correspond to the visible items in the Int array
    for i in 0..<indexArray.count{
        visibleArray.append(indexArray[i][1])
    }
    
    //Alex: 2017-04-11
    // Sort the Int array of FilteredStory indexes
    visibleArray.sort()
    
    // If there are visible items...
    if visibleArray.count > 0{
        
        // The first visible item is the start story, the last visible item is the end story
        let startStory:StarWarsStory = filteredStories[visibleArray[0]]
        let endStory:StarWarsStory = filteredStories[visibleArray[visibleArray.count-1]]
        
        // rangeMultiple is the dimension width for each individual year in the timeline
        //  - NOTE: timelineWidth is the Bright Yellow Timeline box based on user's parameters
        //example: 
        //     5.20588255       =       354            /          68
        let rangeMultiple:Float = Float(timelineWidth) / Float(totalYearRange)
        
        // newStartYearValue converts the negative(BBY)/positive(ABY) format to a positive only version, and shows which year it is from the earliest point
        // Example: 
        //   - Earliest story         == 33 BBY      (startYearSlider.minimumValue  == -33)
        //   - Current story          == 29 BBY      (startStory.storyYearAsInteger == -29)
        //   - newStartYear Value v.1 == 4
        //   - newStartYear Value v.2 == 3.5         (subtract an additional 0.5 to make the width look better)
        
        //example: 
        //           3.5      = (              -29                    - 0.5) + (-1  *             -33              )
        let newStartYearValue = (Float(startStory.storyYearAsInteger) - 0.5) + (-1) * (startYearSlider.minimumValue)
        
        //example 
        //        11.5      = (              -22                  + 0.5) + (-1  *             -33              )
        let newEndYearValue = (Float(endStory.storyYearAsInteger) + 0.5) + (-1) * (startYearSlider.minimumValue)
        
        // startX will be the starting left point coordinate point for the current view
        // - NOTE: yearRangeLeftX permanently stores the furthest left value the yearRange can be.
        //example: 
        //28.2205887 =      10           + (      3.5       *    (5.20588255)     )
        let startX = self.yearRangeLeftX + newStartYearValue * Float(rangeMultiple)
        
        // rangeWidth calculates the number of years between the visible startYear and the endYear
        //example: 
        //       8     =     11.5        -      3.5
        let rangeWidth = newEndYearValue - newStartYearValue
        
        // Set the new width based on the imageSlider value
        //example: 
        //42.6470604 = (     8       *     5.20588255)       + 1
        let newWidth = ((rangeWidth) * Float(rangeMultiple)) + 1
        
        // Animation that is 0.25 seconds long
        UIView.animate(withDuration: 0.25, animations: {
            
            // Reframe the imageSlider image
            self.timelineCurrentItemImage.frame = CGRect(x: CGFloat((startX)+5), y: self.yearRangeImage.frame.origin.y, width: CGFloat(newWidth), height: CGFloat(30))
            
            self.timelineCurrentItemImage.alpha = 0.5
        })
    }   //end of if any visible items

}   //end of setTimelineCurrentPoint()

